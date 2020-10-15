import { Port, PortType } from "./Port";

export class OutPort extends Port {
     constructor(name: string, id?: string) {
          super(name, PortType.SOURCE, id);
     }
}