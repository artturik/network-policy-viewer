import React from 'react';
import { EdgeSmoothStepProps, Position } from '../../types';
interface GetSmoothStepPathParams {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    borderRadius?: number;
    centerX?: number;
    centerY?: number;
}
export declare function getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius, centerX, centerY, }: GetSmoothStepPathParams): string;
declare const _default: React.MemoExoticComponent<({ sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, sourcePosition, targetPosition, arrowHeadType, markerEndId, borderRadius, }: EdgeSmoothStepProps) => JSX.Element>;
export default _default;
