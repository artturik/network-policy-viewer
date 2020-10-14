import React from "react";
import {ArrowHeadType, getBezierPath, getMarkerEnd} from "react-flow-renderer";

export default function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEndId
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX: targetX - 3,
    targetY,
    targetPosition
  });
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, markerEndId);
  return (
      <path
        id={id}
        style={style}
        className="react-flow__edge-path path-default"
        d={edgePath}
        markerEnd={markerEnd}
      />
  );
}
