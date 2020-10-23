import React, { useState } from "react";
import ReactFlow, {removeElements, addEdge, ReactFlowProvider} from "../../react-flow";
import DefaultEdge from "./diagram/DefaultEdge";
import DefaultNode from "./diagram/DefaultNode";
import {NetworkPolicy} from "./NetworkPolicy";
import {networkPolicyToElements, setPositionForElements} from "./Parser";
import {Sidebar} from "./Sidebar";

export interface DiagramProps {
    policy: NetworkPolicy,
}

export function Diagram({ policy }: DiagramProps) {
  const nodeTypes = {
    default: DefaultNode,
    input: DefaultNode,
    output: DefaultNode,
  };
  const edgeTypes = {
    default: DefaultEdge,
  };

  const parsedElements = networkPolicyToElements(policy);
  setPositionForElements(parsedElements)

  // const [elements, setElements] = useState(parsedElements);
  //
  // const onElementsRemove = elementsToRemove =>
  //   setElements(els => removeElements(elementsToRemove, els));
  // const onConnect = params => setElements(els => addEdge(params, els));
  // const onConnectStart = (event, { nodeId, handleType }) => console.log('on connect start', { nodeId, handleType });

  return (
      <ReactFlowProvider>
        <ReactFlow
          elements={parsedElements}
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
