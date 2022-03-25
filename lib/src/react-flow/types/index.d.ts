import { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
export declare type ElementId = string;
export declare type FlowElement = Node | Edge;
export declare type Elements = Array<FlowElement>;
export declare type Transform = [number, number, number];
export declare enum Position {
    Left = "left",
    Top = "top",
    Right = "right",
    Bottom = "bottom"
}
export interface XYPosition {
    x: number;
    y: number;
}
export interface Dimensions {
    width: number;
    height: number;
}
export interface Rect extends Dimensions, XYPosition {
}
export interface Box extends XYPosition {
    x2: number;
    y2: number;
}
export declare type SnapGrid = [number, number];
export interface Node {
    id: ElementId;
    position: XYPosition;
    type?: string;
    __rf?: any;
    data?: any;
    style?: CSSProperties;
    className?: string;
    targetPosition?: Position;
    sourcePosition?: Position;
    isHidden?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    connectable?: boolean;
}
export declare enum ArrowHeadType {
    Arrow = "arrow",
    ArrowClosed = "arrowclosed"
}
export interface Edge {
    id: ElementId;
    type?: string;
    source: ElementId;
    target: ElementId;
    label?: string;
    labelStyle?: CSSProperties;
    labelShowBg?: boolean;
    labelBgStyle?: CSSProperties;
    labelBgPadding?: [number, number];
    labelBgBorderRadius?: number;
    style?: CSSProperties;
    animated?: boolean;
    arrowHeadType?: ArrowHeadType;
    isHidden?: boolean;
    data?: any;
    className?: string;
}
export declare enum BackgroundVariant {
    Lines = "lines",
    Dots = "dots"
}
export declare type HandleType = 'source' | 'target';
export declare type NodeTypesType = {
    [key: string]: React.ReactNode;
};
export declare type EdgeTypesType = NodeTypesType;
export interface SelectionRect extends Rect {
    startX: number;
    startY: number;
    draw: boolean;
}
export interface WrapEdgeProps {
    id: ElementId;
    className?: string;
    type: string;
    data?: any;
    onClick?: (event: React.MouseEvent, edge: Edge) => void;
    selected: boolean;
    animated?: boolean;
    label?: string;
    labelStyle?: CSSProperties;
    labelShowBg?: boolean;
    labelBgStyle?: CSSProperties;
    labelBgPadding?: [number, number];
    labelBgBorderRadius?: number;
    style?: CSSProperties;
    arrowHeadType?: ArrowHeadType;
    source: ElementId;
    target: ElementId;
    sourceHandleId?: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePosition: Position;
    targetPosition: Position;
    elementsSelectable?: boolean;
    markerEndId?: string;
    isHidden?: boolean;
}
export interface EdgeProps {
    id: ElementId;
    source: ElementId;
    target: ElementId;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    selected?: boolean;
    animated?: boolean;
    sourcePosition: Position;
    targetPosition: Position;
    label?: string;
    labelStyle?: CSSProperties;
    labelShowBg?: boolean;
    labelBgStyle?: CSSProperties;
    labelBgPadding?: [number, number];
    labelBgBorderRadius?: number;
    style?: CSSProperties;
    arrowHeadType?: ArrowHeadType;
    markerEndId?: string;
    data?: any;
}
export interface EdgeSmoothStepProps extends EdgeProps {
    borderRadius?: number;
}
export interface EdgeTextProps {
    x: number;
    y: number;
    label?: string;
    labelStyle?: CSSProperties;
    labelShowBg?: boolean;
    labelBgStyle?: CSSProperties;
    labelBgPadding?: [number, number];
    labelBgBorderRadius?: number;
}
export interface NodeProps {
    id: ElementId;
    type: string;
    data: any;
    selected: boolean;
    isConnectable: boolean;
    targetPosition?: Position;
    sourcePosition?: Position;
}
export interface NodeComponentProps {
    id: ElementId;
    type: string;
    data: any;
    selected?: boolean;
    isConnectable: boolean;
    transform?: Transform;
    xPos?: number;
    yPos?: number;
    targetPosition?: Position;
    sourcePosition?: Position;
    onClick?: (node: Node) => void;
    onMouseEnter?: (node: Node) => void;
    onMouseMove?: (node: Node) => void;
    onMouseLeave?: (node: Node) => void;
    onContextMenu?: (node: Node) => void;
    onNodeDragStart?: (node: Node) => void;
    onNodeDragStop?: (node: Node) => void;
    style?: CSSProperties;
}
export interface WrapNodeProps {
    id: ElementId;
    type: string;
    data: any;
    selected: boolean;
    transform: Transform;
    xPos: number;
    yPos: number;
    isSelectable: boolean;
    isDraggable: boolean;
    isConnectable: boolean;
    selectNodesOnDrag: boolean;
    onClick?: (event: ReactMouseEvent, node: Node) => void;
    onMouseEnter?: (event: ReactMouseEvent, node: Node) => void;
    onMouseMove?: (event: ReactMouseEvent, node: Node) => void;
    onMouseLeave?: (event: ReactMouseEvent, node: Node) => void;
    onContextMenu?: (event: ReactMouseEvent, node: Node) => void;
    onNodeDragStart?: (event: ReactMouseEvent, node: Node) => void;
    onNodeDragStop?: (event: ReactMouseEvent, node: Node) => void;
    style?: CSSProperties;
    className?: string;
    sourcePosition?: Position;
    targetPosition?: Position;
    isHidden?: boolean;
    isInitialized?: boolean;
    snapToGrid?: boolean;
    snapGrid?: SnapGrid;
    isDragging?: boolean;
}
export declare type FitViewParams = {
    padding: number;
};
export declare type FitViewFunc = (fitViewOptions?: FitViewParams) => void;
export declare type ProjectFunc = (position: XYPosition) => XYPosition;
export declare type OnLoadParams = {
    zoomIn: () => void;
    zoomOut: () => void;
    zoomTo: (zoomLevel: number) => void;
    fitView: FitViewFunc;
    project: ProjectFunc;
    getElements: () => Elements;
    setTransform: (transform: FlowTransform) => void;
};
export declare type OnLoadFunc = (params: OnLoadParams) => void;
export interface Connection {
    source: ElementId | null;
    target: ElementId | null;
    sourceNodeId: string | null;
    targetNodeId: string | null;
    toTarget?: boolean;
}
export declare enum ConnectionLineType {
    Bezier = "default",
    Straight = "straight",
    Step = "step",
    SmoothStep = "smoothstep"
}
export declare type ConnectionLineComponentProps = {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    connectionLineStyle?: CSSProperties;
    connectionLineType: ConnectionLineType;
};
export declare type ConnectionLineComponent = React.ComponentType<ConnectionLineComponentProps>;
export declare type OnConnectFunc = (connection: Connection) => void;
export declare type OnConnectStartParams = {
    nodeId: ElementId | null;
    handleType: HandleType | null;
};
export declare type OnConnectStartFunc = (event: ReactMouseEvent, params: OnConnectStartParams) => void;
export declare type OnConnectStopFunc = (event: MouseEvent) => void;
export declare type OnConnectEndFunc = (event: MouseEvent) => void;
export declare type SetConnectionId = {
    connectionNodeId: ElementId | null;
    connectionHandleType: HandleType | null;
};
export interface HandleElement extends XYPosition, Dimensions {
    id?: ElementId | null;
    position: Position;
}
export interface HandleProps {
    type: HandleType;
    position: Position;
    isConnectable?: boolean;
    onConnect?: OnConnectFunc;
    isValidConnection?: (connection: Connection) => boolean;
    id?: string;
    style?: CSSProperties;
    className?: string;
}
export declare type NodePosUpdate = {
    id: ElementId;
    pos: XYPosition;
};
export declare type NodeDiffUpdate = {
    id: ElementId;
    diff?: XYPosition;
    isDragging?: boolean;
};
export declare type FlowTransform = {
    x: number;
    y: number;
    zoom: number;
};
export declare type TranslateExtent = [[number, number], [number, number]];
