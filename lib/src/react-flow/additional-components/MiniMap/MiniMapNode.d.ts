import React, { CSSProperties } from 'react';
interface MiniMapNodeProps {
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius: number;
    className: string;
    color: string;
    strokeColor: string;
    style?: CSSProperties;
}
declare const _default: React.MemoExoticComponent<{
    ({ x, y, width, height, style, color, strokeColor, className, borderRadius }: MiniMapNodeProps): JSX.Element;
    displayName: string;
}>;
export default _default;
