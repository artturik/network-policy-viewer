import React, { useState } from "react";
import ReactFlow, {removeElements, addEdge, Elements} from "react-flow-renderer";
import DefaultEdge from "./diagram/DefaultEdge";
import DefaultNode from "./diagram/DefaultNode";
import {Edge} from "./diagram/model/Edge";
import { Node } from "./diagram/model/Node";
import { InPort } from "./diagram/model/InPort";
import { OutPort } from "./diagram/model/OutPort";
export function Diagram() {
  const nodeTypes = {
    default: DefaultNode,
  };
  const edgeTypes = {
    default: DefaultEdge,
  };

  const node1 = new Node("Pods labeled app=frontend");
  node1.setPosition(100, 100);
  node1.addPort(new InPort("80 TCP"));
  const node1OutPort =  node1.addPort(new OutPort("Out"));

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

  const newDefault: Elements = [
      node1,
      node2,
      node3,
      edge1,
      edge2,
  ];

  console.log(newDefault);
  
  const [elements, setElements] = useState(newDefault);
  // todo
  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els));
  const onConnect = params => setElements(els => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
    />
  );
}
