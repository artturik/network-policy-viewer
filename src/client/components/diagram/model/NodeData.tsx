import { Port } from "./Port";

export interface NodeData {
    isPartOfNetworkPolicy: boolean,
    name: string,
    ports: Port[];
}