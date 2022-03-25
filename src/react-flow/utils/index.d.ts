import { DraggableEvent } from 'react-draggable';
import { MouseEvent as ReactMouseEvent } from 'react';
export declare const isInputDOMNode: (e: ReactMouseEvent | DraggableEvent | KeyboardEvent) => boolean;
export declare const getDimensions: (node: HTMLDivElement) => {
    width: number;
    height: number;
};
export declare const clamp: (val: number, min?: number, max?: number) => number;
