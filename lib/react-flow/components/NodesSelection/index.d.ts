/**
 * The nodes selection rectangle gets displayed when a user
 * made a selectio  with on or several nodes
 */
import { MouseEvent } from 'react';
import { Node } from '../../types';
export interface NodesSelectionProps {
    onSelectionDragStart?: (event: MouseEvent, nodes: Node[]) => void;
    onSelectionDrag?: (event: MouseEvent, nodes: Node[]) => void;
    onSelectionDragStop?: (event: MouseEvent, nodes: Node[]) => void;
    onSelectionContextMenu?: (event: MouseEvent, nodes: Node[]) => void;
}
declare const _default: ({ onSelectionDragStart, onSelectionDrag, onSelectionDragStop, onSelectionContextMenu, }: NodesSelectionProps) => JSX.Element;
export default _default;
