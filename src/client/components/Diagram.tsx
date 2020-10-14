import React, { useState } from "react";
import ReactFlow, { removeElements, addEdge } from "react-flow-renderer";
import DefaultEdge from "./diagram/DefaultEdge";
import DefaultNode from "./diagram/DefaultNode";

export function Diagram() {
  const nodeTypes = {
    default: DefaultNode,
  };
  const edgeTypes = {
    default: DefaultEdge,
  };

  const defaultElements = [
    {
      id: "1",
      data: { label: "Input Node" },
      position: { x: 250, y: 25 }
    },
    // default node
    {
      id: "2",
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 }
    },
    {
      id: "3",
      data: { label: "Output Node", name: "ololo" },
      position: { x: 250, y: 250 }
    },
    // animated edge
    { id: "e1-2", source: "1", target: "2", animated: true},
    { id: "e2-3", source: "2", target: "3" }
  ];

  const [elements, setElements] = useState(defaultElements);
  // todo
  // const onElementsRemove = elementsToRemove =>
  //   setElements(els => removeElements(elementsToRemove, els));
  // const onConnect = params => setElements(els => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      // onElementsRemove={onElementsRemove}
      // onConnect={onConnect}
    />
  );
}
