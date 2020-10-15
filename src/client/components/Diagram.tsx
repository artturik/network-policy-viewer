import React, { useState } from "react";
import ReactFlow, {removeElements, addEdge} from "react-flow-renderer";
import DefaultEdge from "./diagram/DefaultEdge";
import { defaultElements } from "./diagram/DefaultElements";
import DefaultNode from "./diagram/DefaultNode";

export function Diagram() {
  const nodeTypes = {
    default: DefaultNode,
  };
  const edgeTypes = {
    default: DefaultEdge,
  };

  const [elements, setElements] = useState(defaultElements);
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
