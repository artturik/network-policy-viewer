import { v4 as uuidv4 } from 'uuid';
import { Port } from "./Port";
import { Edge as EdgeInterface, ElementId } from "../../../../react-flow";

export class Edge implements EdgeInterface {
    id: string;
    source: ElementId;
    sourceNodeId?: string;
    target: ElementId;
    targetNodeId?: string;

    constructor(source: Port, target: Port, id?: string){
        this.source = `${source.getNode().id}__${source.id}`;
        this.sourceNodeId = source.getNode().id;
        this.target = `${target.getNode().id}__${target.id}`;
        this.targetNodeId = target.getNode().id;
        if(!id){
            id = 'e' + uuidv4();
        }
        this.id = id;
    }
}