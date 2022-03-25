import React, { ComponentType } from 'react';
import { NodeComponentProps, WrapNodeProps } from '../../types';
declare const _default: (NodeComponent: ComponentType<NodeComponentProps>) => React.MemoExoticComponent<{
    ({ id, type, data, transform, xPos, yPos, selected, onClick, onMouseEnter, onMouseMove, onMouseLeave, onContextMenu, onNodeDragStart, onNodeDragStop, style, className, isDraggable, isSelectable, isConnectable, selectNodesOnDrag, sourcePosition, targetPosition, isHidden, isInitialized, snapToGrid, snapGrid, isDragging, }: WrapNodeProps): JSX.Element;
    displayName: string;
}>;
export default _default;
