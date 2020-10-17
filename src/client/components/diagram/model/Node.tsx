import { v4 as uuidv4 } from 'uuid';
import { NodeData } from "./NodeData";
import { Port } from "./Port";
import { Node as NodeInterface, XYPosition } from "../../../../react-flow";

export class Node implements NodeInterface {
     id: string;
     data: NodeData = {
          name: '',
          ports: [],
     }
     position: XYPosition;

     constructor(name: string, id?: string) {
          this.data.name = name;
          if(!id){
               id = 'n' + uuidv4();
          }
          this.id = id;
     }

     setPosition(x: number, y: number){
          this.position = {
               x,
               y,
          };
     }

     addPort(port: Port): Port {
          port.setNode(this);
          this.data.ports.push(port);
          return port;
     }

     getPorts(): Port[] {
          return this.data.ports;
     }
}