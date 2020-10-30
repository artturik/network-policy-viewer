import React, { useState } from "react";
import ReactFlow, {removeElements, addEdge, ReactFlowProvider, Elements} from "../../react-flow";
import DefaultEdge from "./diagram/DefaultEdge";
import DefaultNode from "./diagram/DefaultNode";
import {NetworkPolicy} from "./NetworkPolicy";
import {networkPolicyToElements, setPositionForElements} from "./Parser";
import {Sidebar} from "./Sidebar";

export interface DiagramProps {
    elements: Elements,
}

export function Diagram({ elements }: DiagramProps) {
  const nodeTypes = {
    default: DefaultNode,
    input: DefaultNode,
    output: DefaultNode,
  };
  const edgeTypes = {
    default: DefaultEdge,
  };



  //
  // const onElementsRemove = elementsToRemove =>
  //   setElements(els => removeElements(elementsToRemove, els));
  // const onConnect = params => setElements(els => addEdge(params, els));
  // const onConnectStart = (event, { nodeId, handleType }) => console.log('on connect start', { nodeId, handleType });

  return (
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          // onElementsRemove={onElementsRemove}
          // onConnect={onConnect}
          // onConnectStart={onConnectStart}
          style={{height: '100vh'}}
        />
        {/*<Sidebar></Sidebar>*/}
      </ReactFlowProvider>
  );
}
