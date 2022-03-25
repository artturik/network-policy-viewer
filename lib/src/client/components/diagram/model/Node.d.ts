import { NodeData } from "./NodeData";
import { Port } from "./Port";
import { Node as NodeInterface, XYPosition } from "../../../../react-flow";
export declare class Node implements NodeInterface {
    id: string;
    data: NodeData;
    position: XYPosition;
    constructor(name: string, id?: string);
    setPosition(x: number, y: number): void;
    addPort(port: Port): Port;
    getPortWithName(name: string): Port | null;
    setPorts(ports: Port[]): void;
    getPorts(): Port[];
}
