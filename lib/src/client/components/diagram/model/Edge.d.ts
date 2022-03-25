import { Port } from "./Port";
import { Edge as EdgeInterface, ElementId } from "../../../../react-flow";
export declare class Edge implements EdgeInterface {
    id: string;
    source: ElementId;
    sourceNodeId?: string;
    target: ElementId;
    targetNodeId?: string;
    constructor(source: Port, target: Port, id?: string);
}
