import * as yaml from 'js-yaml';
import * as dagre from 'dagre';
import {Elements, XYPosition} from "../../react-flow/types";
import {Edge} from "./diagram/model/Edge";
import {InPort} from "./diagram/model/InPort";
import {Node} from "./diagram/model/Node";
import {OutPort} from "./diagram/model/OutPort";
import {LabelSelector, NetworkPolicy, NetworkPolicyIngressRule} from "./NetworkPolicy";

export function parse(manifest: string) : NetworkPolicy {
    try {
        return new NetworkPolicy(JSON.stringify(yaml.safeLoad(manifest)));
    } catch (e) {
        console.log(e);
    }
}

export function networkPolicyToElements(policy: NetworkPolicy): Elements {
    const result : Elements = [];

    const policyTypes = policy.spec.policyTypes ? policy.spec.policyTypes : [ 'Ingress' ];

    const targetLabels = labelSelectorToLabels(policy.spec.podSelector);
    // todo special node color
    let target = new Node(`All pods in namespace - ${policy.metadata.namespace || 'default'}`);
    if(targetLabels){
        target = new Node(`Pods with label - ${targetLabels.join(' ')}`)
    }
    result.push(target);

    if(policyTypes.includes('Ingress')){
        result.push(...parseIngressRule(policy.spec.ingress, target));
    }

    return result;
}

function parseIngressRule(ingresses: NetworkPolicyIngressRule[], target: Node): Elements {
    const elements: Elements = [];
    for(const ingress of ingresses){
        if(Object.keys(ingress).length === 0){
            // From all to target
            //todo special color
            const node = new Node('ALLOW FROM ALL');
            const outPort = node.addPort(new OutPort('Out'))
            const port = new InPort('Any In');
            target.setPorts([port])
            const edge = new Edge(outPort, port);
            return [node, edge]
        }

        const inPorts: InPort[] = [];
        ingress.ports.forEach(port => {
            const name = `:${port.port} ${port.protocol}`;
            let newPort = target.getPortWithName(name)
            if(!newPort){
                newPort = new InPort(name);
                target.addPort(newPort);
            }
            inPorts.push(newPort)
        })

        const fromNodes: Node[] = [];
        const fromPorts: OutPort[] = [];
        ingress.from.forEach(peer => {
            let name = '';
            if(peer.ipBlock){
                name = `From IPs - ${peer.ipBlock.cidr}`;
                if(peer.ipBlock.except.length !== 0){
                    name += `, except ${peer.ipBlock.except.join(', ')}`;
                }
            } else {
                name = 'Pods ';
                const parts: string[] = [];
                const podLabels = labelSelectorToLabels(peer.podSelector);
                if(podLabels && podLabels.length !== 0){
                    parts.push(`with label ${podLabels.join(',')}`)
                }
                const namespaceLabels = labelSelectorToLabels(peer.namespaceSelector);
                if(namespaceLabels&& namespaceLabels.length !== 0){
                    parts.push(`in namespace with labels ${namespaceLabels.join(',')}`)
                }

                name += parts.join(' and ')
            }

            const node = new Node(name);
            fromPorts.push(node.addPort(new OutPort('Out')));
            fromNodes.push(node)
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

function labelSelectorToLabels(labelSelector?: LabelSelector): string[] | null {
    if(!labelSelector || Object.keys(labelSelector).length === 0){
        return;
    }

    const labels = [];

    Object.keys(labelSelector.matchLabels).forEach(key => {
        labels.push(`${key}=${labelSelector.matchLabels[key]}`);
    })

    return labels;
}

export function setPositionForElements(elements: Elements){
    const g = new dagre.graphlib.Graph({
        graph: {
            rankdir: 'RL',
            ranker: 'longest-path',
            marginx: 25,
            marginy: 25
        },
        includeLinks: true
    });
    g.setGraph({});
    g.setDefaultEdgeLabel(function() { return {}; });

    elements.forEach(element => {
        if(element instanceof Node){
            g.setNode(element.id, {width: 200, height: 100});
        }
    });

    elements.forEach(element => {
        if(element instanceof Edge){
            g.setEdge(element.sourceNodeId, element.targetNodeId);
        }
    });

    dagre.layout(g);

    const map: {[id: string] : XYPosition} = {};
    g.nodes().forEach(nodeId => {
        const nodeData = g.node(nodeId);
        map[nodeId] = { x: nodeData.x, y: nodeData.y };
    });
    // todo points

    elements.forEach(element => {
        if(element instanceof Node){
            const position = map[element.id];
            element.setPosition(position.x, position.y)
        }
    });
}