import { Elements } from "../../react-flow/types";
import { NetworkPolicy } from "./NetworkPolicy";
export declare function parse(manifest: string): NetworkPolicy;
export declare function networkPolicyToElements(policy: NetworkPolicy): Elements;
export declare function networkPolicyToElementsWithPosition(networkPolicy: NetworkPolicy): Elements;
export declare function setPositionForElements(elements: Elements): void;
