import React, { useState } from "react";
import ReactFlow, {removeElements, addEdge, ReactFlowProvider} from "react-flow-renderer";
import {FlowElement} from "react-flow-renderer/dist/types";
import DefaultEdge from "./diagram/DefaultEdge";
import { defaultElements } from "./diagram/DefaultElements";
import DefaultNode from "./diagram/DefaultNode";
import {Sidebar} from "./Sidebar";

export function Diagram() {
  const nodeTypes = {
    default: DefaultNode,
    input: DefaultNode,
    output: DefaultNode,
  };
  const edgeTypes = {
    default: DefaultEdge,
  };

  const [elements, setElements] = useState(defaultElements);

  const elementsMap : { [key:string]:FlowElement; } = {};

  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els));
  const onConnect = params => setElements(els => addEdge(params, els));
  const onConnectStart = (event, { nodeId, handleType }) => console.log('on connect start', { nodeId, handleType });


  return (
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
        />
        <Sidebar></Sidebar>
      </ReactFlowProvider>
  );
}
