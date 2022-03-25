import React, { MouseEvent } from 'react';
import { Node, NodeTypesType, Edge } from '../../types';
interface NodeRendererProps {
    nodeTypes: NodeTypesType;
    selectNodesOnDrag: boolean;
    onElementClick?: (event: MouseEvent, element: Node | Edge) => void;
    onNodeMouseEnter?: (event: MouseEvent, node: Node) => void;
    onNodeMouseMove?: (event: MouseEvent, node: Node) => void;
    onNodeMouseLeave?: (event: MouseEvent, node: Node) => void;
    onNodeContextMenu?: (event: MouseEvent, node: Node) => void;
    onNodeDragStart?: (event: MouseEvent, node: Node) => void;
    onNodeDragStop?: (event: MouseEvent, node: Node) => void;
    onlyRenderVisibleNodes: boolean;
    snapToGrid: boolean;
    snapGrid: [number, number];
}
declare const _default: React.MemoExoticComponent<{
    (props: NodeRendererProps): JSX.Element;
    displayName: string;
}>;
export default _default;
