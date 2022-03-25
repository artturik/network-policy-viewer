import React, { CSSProperties } from "react";
import { HandleType, ElementId, Position, XYPosition, OnConnectFunc, OnConnectStartFunc, OnConnectStopFunc, OnConnectEndFunc, Connection, SetConnectionId } from "../../types";
declare type ValidConnectionFunc = (connection: Connection) => boolean;
declare type SetSourceIdFunc = (params: SetConnectionId) => void;
interface BaseHandleProps {
    type: HandleType;
    nodeId: ElementId;
    onConnect: OnConnectFunc;
    onConnectStart?: OnConnectStartFunc;
    onConnectStop?: OnConnectStopFunc;
    onConnectEnd?: OnConnectEndFunc;
    position: Position;
    setConnectionNodeId: SetSourceIdFunc;
    setConnectionPending: (boolean: any) => void;
    setPosition: (pos: XYPosition) => void;
    isValidConnection: ValidConnectionFunc;
    id?: ElementId | boolean;
    className?: string;
    style?: CSSProperties;
}
declare const _default: React.MemoExoticComponent<{
    ({ type, nodeId, onConnect, onConnectStart, onConnectStop, onConnectEnd, position, setConnectionPending, setConnectionNodeId, setPosition, className, id, isValidConnection, ...rest }: BaseHandleProps): JSX.Element;
    displayName: string;
}>;
export default _default;
