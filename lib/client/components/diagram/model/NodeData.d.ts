import { Port } from "./Port";
import { Pod } from "../../models/Pod";
export interface NodeData {
    isPartOfNetworkPolicy: boolean;
    isPodTarget: boolean;
    podSelector: string[];
    namespaceSelector: string[];
    matchingPods: Pod[];
    name: string;
    ports: Port[];
}
