import { CSSProperties } from 'react';
import { ElementId, Node, Transform, ConnectionLineType, ConnectionLineComponent, HandleType } from '../../types';
interface ConnectionLineProps {
    connectionNodeId: ElementId;
    connectionHandleType: HandleType;
    connectionPositionX: number;
    connectionPositionY: number;
    connectionLineType: ConnectionLineType;
    nodes: Node[];
    transform: Transform;
    isConnectable: boolean;
    connectionLineStyle?: CSSProperties;
    CustomConnectionLineComponent?: ConnectionLineComponent;
}
declare const _default: ({ connectionNodeId, connectionHandleType, connectionLineStyle, connectionPositionX, connectionPositionY, connectionLineType, nodes, transform, isConnectable, CustomConnectionLineComponent, }: ConnectionLineProps) => JSX.Element;
export default _default;
