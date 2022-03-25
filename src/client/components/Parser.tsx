import * as dagre from "dagre";
import * as yaml from "js-yaml";
import {Elements, XYPosition} from "../../react-flow/types";
import {Edge} from "./diagram/model/Edge";
import {InPort} from "./diagram/model/InPort";
import {Node} from "./diagram/model/Node";
import {OutPort} from "./diagram/model/OutPort";
import {
    LabelSelector,
    NetworkPolicy,
    NetworkPolicyEgressRule,
    NetworkPolicyIngressRule,
    NetworkPolicyPeer
} from "./NetworkPolicy";

export function parse(manifest: string): NetworkPolicy {
    try {
        return new NetworkPolicy(JSON.stringify(yaml.load(manifest, {})));
    } catch (e) {
        console.error(e);
    }
}

export function networkPolicyToElements(policy: NetworkPolicy): Elements {
    const result: Elements = [];

    const policyTypes = policy.spec.policyTypes
        ? policy.spec.policyTypes
        : ["Ingress"];

    const namespace = policy.metadata.namespace || "default";
    const targetLabels = labelSelectorToLabels(policy.spec.podSelector);
    // todo special node color
    let target = new Node(
        `All pods in namespace - ${policy.metadata.namespace || "default"}`
    );
    if (targetLabels) {
        target = new Node(`Pods with label - ${targetLabels.join(" ")}`);
    }
    target.data.isPartOfNetworkPolicy = true;
    result.push(target);

    if (policyTypes.includes("Ingress")) {
        result.push(...parseIngressRule(policy.spec.ingress, target, namespace));
    }

    if (policyTypes.includes("Egress")) {
        result.push(...parseEgressRule(policy.spec.egress, target, result, namespace));
    }

    return result;
}

function parseIngressRule(
    ingresses: NetworkPolicyIngressRule[],
    target: Node,
    namespace: string,
): Elements {
    const elements: Elements = [];
    if(!ingresses){
        ingresses = [];
    }
    if(ingresses.length === 0){
        const port = new InPort("Any In");
        port.deny = true;
        target.addPort(port);
    }
    for (const ingress of ingresses) {
        if (!ingress.ports && !ingress.from) {
            // From all to target
            //todo special color
            const node = new Node("ALLOW FROM ALL");
            const outPort = node.addPort(new OutPort("Out"));
            const port = new InPort("Any In");
            target.setPorts([port]);
            const edge = new Edge(outPort, port);
            return [node, edge];
        }

        const inPorts: InPort[] = [];
        if(ingress.ports){
            ingress.ports.forEach(port => {
                const name = `:${port.port} ${port.protocol}`;
                let newPort = target.getPortWithName(name);
                if (!newPort) {
                    newPort = new InPort(name);
                    target.addPort(newPort);
                }
                inPorts.push(newPort);
            });
        } else {
            const name = "Any In";
            let newPort = target.getPortWithName(name);
            if (!newPort) {
                newPort = new InPort(name);
                target.addPort(newPort);
            }
            inPorts.push(newPort);
        }

        const fromNodes: Node[] = [];
        const fromPorts: OutPort[] = [];
        ingress.from.forEach(peer => {
            const node = networkPolicyPeerToNode(peer, namespace);
            fromPorts.push(node.addPort(new OutPort("Out")));
            fromNodes.push(node);
        });

        const edges: Edge[] = [];
        fromPorts.forEach(fromPort => {
            inPorts.forEach(inPort => {
                edges.push(new Edge(fromPort, inPort));
            });
        });

        elements.push(...fromNodes, ...edges);
    }
    return elements;
}

function parseEgressRule(
    egresses: NetworkPolicyEgressRule[],
    target: Node,
    existingElements: Elements,
    namespace: string,
): Elements {
    const elements: Elements = [];
    let outPort = target.getPortWithName("Out");
    if (!outPort) {
        outPort = new OutPort("Out");
        target.addPort(outPort);
    }

    if(!egresses){
        egresses = [];
    }

    if(egresses.length === 0){
        outPort.deny = true;
    }
    for (const egress of egresses) {
        const toNodes: Node[] = [];
        if (!egress.to) {
            // Allow to all
            //todo special color
            const node = new Node("ALLOW TO ALL");
            toNodes.push(node);
        }

        let toPorts: string[] = [];
        if(egress.ports){
            egress.ports.forEach(port => {
                //todo check if node already exist
                const name = `:${port.port} ${port.protocol}`;
                toPorts.push(name);
            });
        } else {
            toPorts.push("Any In");
        }

        egress.to?.forEach(peer => {
            const node = networkPolicyPeerToNode(peer, namespace);
            toNodes.push(node);
        });

        const portsOnNodes: InPort[] = [];
        toNodes.forEach(node => {
            toPorts.forEach((port, index) => {
                let newPort = node.getPortWithName(port);
                if (!newPort) {
                    newPort = new InPort(port);
                    node.addPort(newPort);
                }
                portsOnNodes.push(newPort);
            });
        });

        const edges: Edge[] = [];
        portsOnNodes.forEach(toPort => {
              edges.push(new Edge(outPort, toPort));
        });

        elements.push(...toNodes, ...edges);
    }
    return elements;
}

function networkPolicyPeerToNode(peer: NetworkPolicyPeer, currentNamespace: string): Node {
    let name: string;
    if (peer.ipBlock) {
        name = `IPs - ${peer.ipBlock.cidr}`;
        if (peer.ipBlock.except && peer.ipBlock.except.length !== 0) {
            name += `, except ${peer.ipBlock.except.join(", ")}`;
        }
    } else {
        name = "Pods ";
        const parts: string[] = [];
        const podLabels = labelSelectorToLabels(peer.podSelector);
        if (podLabels && podLabels.length !== 0) {
            parts.push(`with label ${podLabels.join(", ")}`);
        } else if (peer.podSelector !== undefined){
            name = "All pods "
        }

        const namespaceLabels = labelSelectorToLabels(peer.namespaceSelector);
        if (namespaceLabels && namespaceLabels.length !== 0) {
            parts.push(`in namespace with labels ${namespaceLabels.join(", ")}`);
        } else if (peer.namespaceSelector !== undefined) {
            parts.push('in any namespace')
        }

        if(parts.length > 0){
            name += parts.join(" and ");
        } else {
            name += `in namespace ${currentNamespace}`
        }
    }

    return new Node(name);
}

export function networkPolicyToElementsWithPosition(networkPolicy: NetworkPolicy): Elements {
    const elements = networkPolicyToElements(networkPolicy);
    setPositionForElements(elements);
    return elements;
}

function labelSelectorToLabels(labelSelector?: LabelSelector): string[] | null {
    if (!labelSelector || !labelSelector.matchLabels) {
        return;
    }

    const labels = [];

    Object.keys(labelSelector.matchLabels).forEach(key => {
        labels.push(`${key}=${labelSelector.matchLabels[key]}`);
    });

    return labels;
}

export function setPositionForElements(elements: Elements) {
    const g = new dagre.graphlib.Graph({});
    g.setGraph({
        rankdir: "LR",
        nodesep: 100,
        ranksep: 100,
        ranker: "longest-path",
        marginx: 25,
        marginy: 25
    });
    g.setDefaultEdgeLabel(function () {
        return {};
    });

    elements.forEach(element => {
        if (element instanceof Node) {
            g.setNode(element.id, {
                width: Math.max(150, element.data.name.length * 7),
                height: Math.max(40, 20 + element.data.ports.length * 15)
            });
        }
    });

    elements.forEach(element => {
        if (element instanceof Edge) {
            g.setEdge(element.sourceNodeId, element.targetNodeId);
        }
    });

    dagre.layout(g);

    const map: { [id: string]: XYPosition } = {};
    g.nodes().forEach(nodeId => {
        const nodeData = g.node(nodeId);
        map[nodeId] = {x: nodeData.x, y: nodeData.y};
    });
    // todo points

    elements.forEach(element => {
        if (element instanceof Node) {
            const position = map[element.id];
            element.setPosition(position.x, position.y);
        }
    });
}
