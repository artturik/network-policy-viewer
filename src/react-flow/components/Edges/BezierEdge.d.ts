import React from 'react';
import { EdgeProps, Position } from '../../types';
interface GetBezierPathParams {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    centerX?: number;
    centerY?: number;
}
export declare function getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, centerX, centerY, }: GetBezierPathParams): string;
declare const _default: React.MemoExoticComponent<({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, arrowHeadType, markerEndId, }: EdgeProps) => JSX.Element>;
export default _default;
