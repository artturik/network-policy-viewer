import {Elements} from "react-flow-renderer";
import {Edge} from "./model/Edge";
import {InNode} from "./model/InNode";
import {InPort} from "./model/InPort";
import {Node} from "./model/Node";
import {OutNode} from "./model/OutNode";
import {OutPort} from "./model/OutPort";

const node1 = new Node("Pods labeled app=frontend");
node1.setPosition(100, 100);
node1.addPort(new InPort("80 TCP"));
const node1OutPort = node1.addPort(new OutPort("Out"));

const node2 = new Node("Pods labeled app=backend");
node2.setPosition(400, 100);
const node2Tcp80Port = node2.addPort(new InPort("80 TCP"));
const node2OutPort = node2.addPort(new OutPort("Out"));

const node3 = new Node("Pods labeled app=database");
node3.setPosition(400, 100);
const node3Tcp3306Port = node3.addPort(new InPort("3306 TCP"));
node3.addPort(new OutPort("Out"));
node3.setPosition(600, 100);

const edge1 = new Edge(node1OutPort, node2Tcp80Port);
const edge2 = new Edge(node2OutPort, node3Tcp3306Port);

const specialEgress = new InNode("Special Egress");
specialEgress.setPosition(200, 200);
specialEgress.addPort(new InPort("Only to External"));
specialEgress.addPort(new InPort("Only to Cluster"));
specialEgress.addPort(new InPort("Only to current namespace"));

const specialIngress = new OutNode("Special Ingress");
specialIngress.setPosition(200, 400);
specialIngress.addPort(new OutPort("Only from External"));
specialIngress.addPort(new OutPort("Only from Cluster"));
specialIngress.addPort(new OutPort("Only from current namespace"));


export const defaultElements: Elements = [
    node1,
    node2,
    node3,
    specialIngress,
    specialEgress,
    edge1,
    edge2,
];