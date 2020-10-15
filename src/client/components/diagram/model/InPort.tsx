import { Port, PortType } from "./Port";

export class InPort extends Port {
     constructor(name: string, id?: string) {
          super(name, PortType.TARGET, id);
     }
}