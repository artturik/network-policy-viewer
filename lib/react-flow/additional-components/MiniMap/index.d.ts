import React from 'react';
import { Node } from '../../types';
import './style.css';
declare type StringFunc = (node: Node) => string;
export interface MiniMapProps extends React.HTMLAttributes<SVGSVGElement> {
    nodeColor?: string | StringFunc;
    nodeStrokeColor?: string | StringFunc;
    nodeClassName?: string | StringFunc;
    nodeBorderRadius?: number;
    maskColor?: string;
}
declare const _default: React.MemoExoticComponent<{
    ({ style, className, nodeStrokeColor, nodeColor, nodeClassName, nodeBorderRadius, maskColor, }: MiniMapProps): JSX.Element;
    displayName: string;
}>;
export default _default;
