import React from "react";
import ReactFlow, { ReactFlowProvider, Elements } from "../../react-flow";
import DefaultEdge from "./diagram/DefaultEdge";
import DefaultNode from "./diagram/DefaultNode";

export interface DiagramProps {
    elements: Elements
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

  return (
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        />
      </ReactFlowProvider>
  );
}
