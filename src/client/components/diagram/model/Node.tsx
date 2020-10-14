import { XYPosition } from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';
import { Port } from "./Port";

export interface NodeData {
     name: string,
     ports: Port[];
}

export class Node {
     id: string;
     data: NodeData = {
          name: '',
          ports: [],
     }
     position: XYPosition;

     constructor(id?: string) {
          if(!id){
               id = 'n' + uuidv4();
          }
          this.id = id;
     }

     setPosition(position: XYPosition){
          this.position = position;
     }

     setName(name: string){
          this.data.name = name;
     }

     addPort(port: Port){
          this.data.ports.push(port);
     }

     getPorts(): Port[] {
          return this.data.ports;
     }
}