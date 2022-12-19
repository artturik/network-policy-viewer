import * as dagre from "dagre";
import * as yaml from "js-yaml";
import { Elements, XYPosition } from "../../react-flow/types";
import { Edge } from "./diagram/model/Edge";
import { InPort } from "./diagram/model/InPort";
import { Node } from "./diagram/model/Node";
import { OutPort } from "./diagram/model/OutPort";
import {
  LabelSelector,
  NetworkPolicy,
  NetworkPolicyEgressRule,
  NetworkPolicyIngressRule,
  NetworkPolicyPeer,
} from "./models/NetworkPolicy";
import { Pod } from "./models/Pod";
import { Resource } from "./models/Resource";
import { Namespace } from "./models/Namespace";

export function parse(manifest: string): NetworkPolicy {
  try {
    return new NetworkPolicy(JSON.stringify(yaml.load(manifest, {})));
  } catch (e) {
    console.error(e);
  }
}

export function parseResource<T extends Resource>(
  resources: string[],
  c: { new (string): T }
): T[] {
  const result: T[] = [];
  resources.forEach((resource) => {
    try {
      result.push(new c(JSON.stringify(yaml.load(resource, {}))));
    } catch (e) {
      console.error(e);
    }
  });
  return result;
}

export function getResourceNamespace(
  resource: NetworkPolicy | Resource
): string {
  return resource.metadata.namespace || "default";
}

export function networkPolicyToElements(policy: NetworkPolicy): Elements {
  const result: Elements = [];

  const policyTypes = policy.spec.policyTypes
    ? policy.spec.policyTypes
    : ["Ingress"];

  const namespace = getResourceNamespace(policy);
  const targetLabels = labelSelectorToLabels(policy.spec.podSelector);
  // todo special node color
  let target = new Node(`All pods in namespace - ${namespace}`);
  target.data.namespaceSelector = [namespace];
  target.data.podSelector = ["*"];
  if (targetLabels) {
    target.setName(
      `Pods with label - ${targetLabels.join(" ")} in namespace - ${namespace}`
    );
    target.data.podSelector = targetLabels;
  }
  target.data.isPartOfNetworkPolicy = true;
  result.push(target);

  if (policyTypes.includes("Ingress")) {
    result.push(...parseIngressRule(policy.spec.ingress, target, namespace));
  }

  if (policyTypes.includes("Egress")) {
    result.push(
      ...parseEgressRule(policy.spec.egress, target, result, namespace)
    );
  }

  return result;
}

function parseIngressRule(
  ingresses: NetworkPolicyIngressRule[],
  target: Node,
  namespace: string
): Elements {
  const elements: Elements = [];
  if (!ingresses) {
    ingresses = [];
  }
  if (ingresses.length === 0) {
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
    if (ingress.ports) {
      ingress.ports.forEach((port) => {
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
    ingress.from.forEach((peer) => {
      const node = networkPolicyPeerToNode(peer, namespace);
      fromPorts.push(node.addPort(new OutPort("Out")));
      fromNodes.push(node);
    });

    const edges: Edge[] = [];
    fromPorts.forEach((fromPort) => {
      inPorts.forEach((inPort) => {
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
  namespace: string
): Elements {
  const elements: Elements = [];
  let outPort = target.getPortWithName("Out");
  if (!outPort) {
    outPort = new OutPort("Out");
    target.addPort(outPort);
  }

  if (!egresses) {
    egresses = [];
  }

  if (egresses.length === 0) {
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
    if (egress.ports) {
      egress.ports.forEach((port) => {
        //todo check if node already exist
        const name = `:${port.port} ${port.protocol}`;
        toPorts.push(name);
      });
    } else {
      toPorts.push("Any In");
    }

    egress.to?.forEach((peer) => {
      const node = networkPolicyPeerToNode(peer, namespace);
      toNodes.push(node);
    });

    const portsOnNodes: InPort[] = [];
    toNodes.forEach((node) => {
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
    portsOnNodes.forEach((toPort) => {
      edges.push(new Edge(outPort, toPort));
    });

    elements.push(...toNodes, ...edges);
  }
  return elements;
}

function networkPolicyPeerToNode(
  peer: NetworkPolicyPeer,
  currentNamespace: string
): Node {
  let name: string;
  const resultNode = new Node("");
  if (peer.ipBlock) {
    name = `IPs - ${peer.ipBlock.cidr}`;
    if (peer.ipBlock.except && peer.ipBlock.except.length !== 0) {
      name += `, except ${peer.ipBlock.except.join(", ")}`;
    }
    resultNode.data.isPodTarget = false;
  } else {
    name = "Pods ";
    const parts: string[] = [];
    resultNode.data.podSelector = ["*"];
    resultNode.data.namespaceSelector = [currentNamespace];
    const podLabels = labelSelectorToLabels(peer.podSelector);
    if (podLabels && podLabels.length !== 0) {
      parts.push(`with label ${podLabels.join(", ")}`);
      resultNode.data.podSelector = podLabels;
    } else if (peer.podSelector !== undefined) {
      name = "All pods ";
    }

    const namespaceLabels = labelSelectorToLabels(peer.namespaceSelector);
    if (namespaceLabels && namespaceLabels.length !== 0) {
      parts.push(`in namespace with labels ${namespaceLabels.join(", ")}`);
      resultNode.data.namespaceSelector = namespaceLabels;
    } else if (peer.namespaceSelector !== undefined) {
      parts.push("in any namespace");
      resultNode.data.namespaceSelector = ["*"];
    } else {
      parts.push(`in namespace - ${currentNamespace}`);
    }

    if (parts.length > 0) {
      name += parts.join(" ");
    }
  }

  resultNode.setName(name);
  return resultNode;
}

export function networkPolicyToElementsWithPosition(
  networkPolicy: NetworkPolicy,
  pods: Pod[],
  namespaces: Namespace[]
): Elements {
  const elements = networkPolicyToElements(networkPolicy);
  addPodsInfoToNodes(elements, pods, namespaces);
  setPositionForElements(elements);
  return elements;
}

function labelSelectorToLabels(labelSelector?: LabelSelector): string[] | null {
  if (!labelSelector || !labelSelector.matchLabels) {
    return;
  }

  const labels = [];

  Object.keys(labelSelector.matchLabels).forEach((key) => {
    labels.push(`${key}=${labelSelector.matchLabels[key]}`);
  });

  return labels;
}

export function addPodsInfoToNodes(
  elements: Elements,
  pods: Pod[],
  namespaces: Namespace[]
) {
  elements.forEach((element) => {
    if (!element.data) {
      return;
    }
    if (!element.data.isPodTarget) {
      return;
    }
    let filteredPods = pods;
    if (element.data.namespaceSelector.length > 0) {
      element.data.namespaceSelector.forEach((nsSelector) => {
        if (nsSelector === "*") {
          // all qualified
          return;
        }
        const parts = nsSelector.split("=");
        if (parts.length === 1) {
          const nsName = parts[0];
          filteredPods = filteredPods.filter((pod) => {
            return getResourceNamespace(pod) === nsName;
          });
        } else {
          filteredPods = filteredPods.filter((pod) => {
            const podNamespace = getResourceNamespace(pod);
            const ns = namespaces.find(
              (ns) => ns.metadata.name === podNamespace
            );
            if (!ns) {
              return false;
            }
            const [key, value] = nsSelector.split("=");
            return (
              ns.metadata &&
              ns.metadata.labels &&
              ns.metadata.labels[key] &&
              ns.metadata.labels[key] === value
            );
          });
        }
      });
    }
    if (element.data.podSelector.length > 0) {
      element.data.podSelector.forEach((podSelector) => {
        if (podSelector === "*") {
          // all qualified
          return;
        }
        const [key, value] = podSelector.split("=");
        filteredPods = filteredPods.filter((pod) => {
          return (
            pod.metadata &&
            pod.metadata.labels &&
            pod.metadata.labels[key] &&
            pod.metadata.labels[key] === value
          );
        });
      });
    }
    element.data.matchingPods = filteredPods;
  });
}

export function setPositionForElements(elements: Elements) {
  const g = new dagre.graphlib.Graph({});
  g.setGraph({
    rankdir: "LR",
    nodesep: 100,
    ranksep: 100,
    ranker: "longest-path",
    marginx: 25,
    marginy: 25,
  });
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  elements.forEach((element) => {
    if (element instanceof Node) {
      g.setNode(element.id, {
        width: Math.max(150, element.data.name.length * 7),
        height: Math.max(
          40,
          20 +
            element.data.ports.length * 15 +
            element.data.matchingPods.length * 15
        ),
      });
    }
  });

  elements.forEach((element) => {
    if (element instanceof Edge) {
      g.setEdge(element.sourceNodeId, element.targetNodeId);
    }
  });

  dagre.layout(g);

  const map: { [id: string]: XYPosition } = {};
  g.nodes().forEach((nodeId) => {
    const nodeData = g.node(nodeId);
    map[nodeId] = { x: nodeData.x, y: nodeData.y };
  });
  // todo points

  elements.forEach((element) => {
    if (element instanceof Node) {
      const position = map[element.id];
      element.setPosition(position.x, position.y);
    }
  });
}
