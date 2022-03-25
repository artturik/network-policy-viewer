import { Node } from './Node';
export declare enum PortType {
    SOURCE = "source",
    TARGET = "target"
}
export declare class Port {
    id: string;
    private readonly uid;
    type: PortType;
    name: string;
    deny: boolean;
    private node?;
    constructor(name: string, type: PortType, id?: string);
    setNode(node: Node): void;
    getNode(): Node;
}
