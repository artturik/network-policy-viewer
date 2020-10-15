import { v4 as uuidv4 } from 'uuid';
import { Node } from './Node';

export enum PortType {
  SOURCE = 'source',
  TARGET = 'target',
}

export class Port {
     id: string;
     private readonly uid: string;
     type: PortType;
     name: string;
     private node?: Node;

     constructor(name: string, type: PortType, id?: string) {
          this.name = name;
          this.type = type;
          if(!id){
               id = 'p' + uuidv4();
          }
          this.id = id;
          this.uid = id;
     }

     setNode(node: Node){
          this.id = `${node.id}__${this.uid}`;
          this.node = node;
     }

     getNode(): Node {
          return this.node;
     }
}