import { Elements } from "../../react-flow/types";
import { NetworkPolicy } from "./models/NetworkPolicy";
import { Pod } from "./models/Pod";
import { Resource } from "./models/Resource";
import { Namespace } from "./models/Namespace";
export declare function parse(manifest: string): NetworkPolicy;
export declare function parseResource<T extends Resource>(resources: string[], c: {
    new (string: any): T;
}): T[];
export declare function getResourceNamespace(resource: NetworkPolicy | Resource): string;
export declare function networkPolicyToElements(policy: NetworkPolicy): Elements;
export declare function networkPolicyToElementsWithPosition(networkPolicy: NetworkPolicy, pods: Pod[], namespaces: Namespace[]): Elements;
export declare function addPodsInfoToNodes(elements: Elements, pods: Pod[], namespaces: Namespace[]): void;
export declare function setPositionForElements(elements: Elements): void;
