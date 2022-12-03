import { v4 as uuidv4 } from "uuid";
import { NodeData } from "./NodeData";
import { Port } from "./Port";
import { Node as NodeInterface, XYPosition } from "../../../../react-flow";

export class Node implements NodeInterface {
  id: string;
  data: NodeData = {
    isPartOfNetworkPolicy: false,
    isPodTarget: true,
    name: "",
    ports: [],
    podSelector: [],
    namespaceSelector: [],
    matchingPods: [],
  };
  position: XYPosition;

  constructor(name: string, id?: string) {
    this.data.name = name;
    if (!id) {
      id = "n" + uuidv4();
    }
    this.id = id;
  }

  setPosition(x: number, y: number) {
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

  getPortWithName(name: string): Port | null {
    return this.data.ports.find((port) => port.name === name);
  }

  setPorts(ports: Port[]) {
    this.data.ports = [];
    ports.forEach((port) => {
      port.setNode(this);
      this.data.ports.push(port);
    });
  }

  setName(name: string) {
    this.data.name = name;
  }

  getPorts(): Port[] {
    return this.data.ports;
  }
}
