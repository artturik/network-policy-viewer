import { v4 as uuidv4 } from 'uuid';
import { Port } from "./Port";
import { Edge as EdgeInterface, ElementId } from "react-flow-renderer";

export class Edge implements EdgeInterface {
    id: string;
    source: ElementId;
    target: ElementId;

    constructor(source: Port, target: Port, id?: string){
        this.source = source.id;
        this.target = target.id;
        if(!id){
            id = 'e' + uuidv4();
        }
        this.id = id;
    }
}