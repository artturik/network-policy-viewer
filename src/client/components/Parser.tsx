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
        return new NetworkPolicy(JSON.stringify(yaml.safeLoad(manifest)));
    } catch (e) {
        console.error(e);
    }
}

export function networkPolicyToElements(policy: NetworkPolicy): Elements {
    const result: Elements = [];

    const policyTypes = policy.spec.policyTypes
        ? policy.spec.policyTypes
        : ["Ingress"];

    const targetLabels = labelSelectorToLabels(policy.spec.podSelector);
    // todo special node color
    let target = new Node(
        `All pods in namespace - ${policy.metadata.namespace || "default"}`
    );
    if (targetLabels) {
        target = new Node(`Pods with label - ${targetLabels.join(" ")}`);
    }
    result.push(target);

    if (policyTypes.includes("Ingress")) {
        result.push(...parseIngressRule(policy.spec.ingress, target));
    }

    if (policyTypes.includes("Egress")) {
        result.push(...parseEgressRule(policy.spec.egress, target, result));
    }

    return result;
}

function parseIngressRule(
    ingresses: NetworkPolicyIngressRule[],
    target: Node
): Elements {
    const elements: Elements = [];
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
            const node = networkPolicyPeerToNode(peer);
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
): Elements {
    const elements: Elements = [];
    let outPort = target.getPortWithName("Out");
    if (!outPort) {
        outPort = new OutPort("Out");
        target.addPort(outPort);
    }
    for (const egress of egresses) {
        if (!egress.ports && !egress.to) {
            // Allow to all
            //todo special color
            const node = new Node("ALLOW TO ALL");
            const inPort = node.addPort(new InPort("Any In"));

            const edge = new Edge(outPort, inPort);
            return [node, edge];
        }

        let toPorts: InPort[] = [];
        if(egress.ports){
            egress.ports.forEach(port => {
                //todo check if node already exist
                const name = `:${port.port} ${port.protocol}`;
                toPorts.push(new InPort(name));
            });
        } else {
            toPorts.push(new InPort("Any In"));
        }


        const toNodes: Node[] = [];
        egress.to.forEach(peer => {
            const node = networkPolicyPeerToNode(peer);

            toPorts.forEach((port, index) => {
                let newPort = node.getPortWithName(port.name);
                if (!newPort) {
                    node.addPort(port);
                } else {
                    // delete current port
                    toPorts.splice(index, 1);
                    toPorts.push(newPort);
                }
            });
            toNodes.push(node);
        });

        const edges: Edge[] = [];
        toPorts.forEach(toPort => {
              edges.push(new Edge(outPort, toPort));
        });

        elements.push(...toNodes, ...edges);
    }
    return elements;
}

function networkPolicyPeerToNode(peer: NetworkPolicyPeer): Node {
    let name: string;
    if (peer.ipBlock) {
        name = `From IPs - ${peer.ipBlock.cidr}`;
        if (peer.ipBlock.except && peer.ipBlock.except.length !== 0) {
            name += `, except ${peer.ipBlock.except.join(", ")}`;
        }
    } else {
        name = "Pods ";
        const parts: string[] = [];
        const podLabels = labelSelectorToLabels(peer.podSelector);
        if (podLabels && podLabels.length !== 0) {
            parts.push(`with label ${podLabels.join(",")}`);
        }
        const namespaceLabels = labelSelectorToLabels(peer.namespaceSelector);
        if (namespaceLabels && namespaceLabels.length !== 0) {
            parts.push(`in namespace with labels ${namespaceLabels.join(",")}`);
        }

        name += parts.join(" and ");
    }

    return new Node(name);
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
