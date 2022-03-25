import React, { ReactNode } from 'react';
import { GraphViewProps } from '../GraphView';
interface FlowRendererProps extends Omit<GraphViewProps, 'elements' | 'snapToGrid' | 'nodeTypes' | 'edgeTypes' | 'snapGrid' | 'connectionLineType' | 'arrowHeadColor' | 'onlyRenderVisibleNodes'> {
    children: ReactNode;
}
declare const _default: React.MemoExoticComponent<{
    ({ children, onPaneClick, onPaneContextMenu, onPaneScroll, onElementsRemove, deleteKeyCode, onMove, onMoveStart, onMoveEnd, selectionKeyCode, zoomOnScroll, zoomOnDoubleClick, paneMoveable, defaultPosition, defaultZoom, translateExtent, onSelectionDragStart, onSelectionDrag, onSelectionDragStop, onSelectionContextMenu, }: FlowRendererProps): JSX.Element;
    displayName: string;
}>;
export default _default;
