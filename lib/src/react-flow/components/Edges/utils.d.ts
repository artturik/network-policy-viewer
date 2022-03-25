import { ArrowHeadType } from '../../types';
export declare const getMarkerEnd: (arrowHeadType?: ArrowHeadType, markerEndId?: string) => string;
export interface GetCenterParams {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}
export declare const getCenter: ({ sourceX, sourceY, targetX, targetY, }: GetCenterParams) => [number, number, number, number];
