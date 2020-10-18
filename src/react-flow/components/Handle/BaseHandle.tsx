import React, {
  memo,
  MouseEvent as ReactMouseEvent,
  CSSProperties
} from "react";
import cc from "classcat";

import {
  HandleType,
  ElementId,
  Position,
  XYPosition,
  OnConnectFunc,
  OnConnectStartFunc,
  OnConnectStopFunc,
  OnConnectEndFunc,
  Connection,
  SetConnectionId
} from "../../types";

type ValidConnectionFunc = (connection: Connection) => boolean;
type SetSourceIdFunc = (params: SetConnectionId) => void;

interface BaseHandleProps {
  type: HandleType;
  nodeId: ElementId;
  onConnect: OnConnectFunc;
  onConnectStart?: OnConnectStartFunc;
  onConnectStop?: OnConnectStopFunc;
  onConnectEnd?: OnConnectEndFunc;
  position: Position;
  setConnectionNodeId: SetSourceIdFunc;
  setConnectionPending: (boolean) => void;
  setPosition: (pos: XYPosition) => void;
  isValidConnection: ValidConnectionFunc;
  id?: ElementId | boolean;
  className?: string;
  style?: CSSProperties;
}

type Result = {
  elementBelow: Element | null;
  isValid: boolean;
  connection: Connection;
  isHoveringHandle: boolean;
};

function onMouseDown(
  event: ReactMouseEvent,
  nodeId: ElementId,
  setConnectionPending: (boolean) => void,
  setConnectionNodeId: SetSourceIdFunc,
  setPosition: (pos: XYPosition) => void,
  onConnect: OnConnectFunc,
  isTarget: boolean,
  isValidConnection: ValidConnectionFunc,
  onConnectStart?: OnConnectStartFunc,
  onConnectStop?: OnConnectStopFunc,
  onConnectEnd?: OnConnectEndFunc
): void {
  const reactFlowNode = (event.target as Element).closest(".react-flow");

  if (!reactFlowNode) {
    return;
  }

  const handleType = isTarget ? "target" : "source";
  const containerBounds = reactFlowNode.getBoundingClientRect();
  let recentHoveredHandle: Element;

  setPosition({
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top
  });
  setConnectionPending(true);
  setConnectionNodeId({
    connectionNodeId: nodeId,
    connectionHandleType: handleType
  });

  if (onConnectStart) {
    onConnectStart(event, { nodeId, handleType });
  }

  function resetRecentHandle(): void {
    if (!recentHoveredHandle) {
      return;
    }

    recentHoveredHandle.classList.remove("react-flow__handle-valid");
    recentHoveredHandle.classList.remove("react-flow__handle-invalid");
  }

  // checks if element below mouse is a handle and returns connection in form of an object { source: 123, target: 312 }
  function checkElementBelowIsValid(event: MouseEvent) {
    const elementBelow = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    const result: Result = {
      elementBelow,
      isValid: false,
      connection: {
        source: null,
        sourceNodeId: null,
        targetNodeId: null,
        target: null,
        toTarget: null
      },
      isHoveringHandle: false
    };

    const elementBelowTarget =
      elementBelow && elementBelow.classList.contains("target");
    const elementBelowSource =
      elementBelow && elementBelow.classList.contains("source");

    if (elementBelowTarget || elementBelowSource) {
      let connection: Connection;

      const elementBelowId = elementBelow.getAttribute("data-nodeid");
      const elementBelowNodeId = elementBelowId.split("__")?.[0];
      const onlyNodeId = nodeId.split("__")?.[0];
      if (isTarget) {
        connection = {
          source: elementBelowId,
          sourceNodeId: elementBelowNodeId,
          target: nodeId,
          targetNodeId: onlyNodeId,
          toTarget: elementBelowTarget
        };
      } else {
        connection = {
          source: nodeId,
          sourceNodeId: onlyNodeId,
          target: elementBelowId,
          targetNodeId: elementBelowNodeId,
          toTarget: elementBelowTarget
        };
      }

      const isValid = isValidConnection(connection);

      result.connection = connection;
      result.isValid = isValid;
      result.isHoveringHandle = true;
    }

    return result;
  }

  function onMouseMove(event: MouseEvent) {
    setPosition({
      x: event.clientX - containerBounds.left,
      y: event.clientY - containerBounds.top
    });

    const {
      connection,
      elementBelow,
      isValid,
      isHoveringHandle
    } = checkElementBelowIsValid(event);

    if (!isHoveringHandle) {
      return resetRecentHandle();
    }

    const isOwnHandle = connection.source === connection.target;

    if (!isOwnHandle && elementBelow) {
      recentHoveredHandle = elementBelow;
      elementBelow.classList.toggle("react-flow__handle-valid", isValid);
      elementBelow.classList.toggle("react-flow__handle-invalid", !isValid);
    }
  }

  function onMouseUp(event: MouseEvent) {
    const { connection, isValid } = checkElementBelowIsValid(event);

    if (onConnectStop) {
      onConnectStop(event);
    }

    if (isValid && onConnect) {
      onConnect(connection);
    }

    if (onConnectEnd) {
      onConnectEnd(event);
    }

    resetRecentHandle();
    setConnectionPending(false);
    setConnectionNodeId({ connectionNodeId: null, connectionHandleType: null });

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

const BaseHandle = ({
  type,
  nodeId,
  onConnect,
  onConnectStart,
  onConnectStop,
  onConnectEnd,
  position,
  setConnectionPending,
  setConnectionNodeId,
  setPosition,
  className,
  id = false,
  isValidConnection,
  ...rest
}: BaseHandleProps) => {
  const isTarget = type === "target";
  const handleClasses = cc([
    "react-flow__handle",
    `react-flow__handle-${position}`,
    "nodrag",
    className,
    {
      source: !isTarget,
      target: isTarget
    }
  ]);

  const nodeIdWithHandleId = id ? `${nodeId}__${id}` : nodeId;

  return (
    <div
      data-nodeid={nodeIdWithHandleId}
      data-handlepos={position}
      className={handleClasses}
      onMouseDown={event =>
        onMouseDown(
          event,
          nodeIdWithHandleId,
          setConnectionPending,
          setConnectionNodeId,
          setPosition,
          onConnect,
          isTarget,
          isValidConnection,
          onConnectStart,
          onConnectStop,
          onConnectEnd
        )
      }
      {...rest}
    />
  );
};

BaseHandle.displayName = "BaseHandle";

export default memo(BaseHandle);
