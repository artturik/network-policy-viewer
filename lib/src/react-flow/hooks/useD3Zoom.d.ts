import { MutableRefObject } from 'react';
import { FlowTransform, TranslateExtent } from '../types';
interface UseD3ZoomParams {
    zoomPane: MutableRefObject<Element | null>;
    selectionKeyPressed: boolean;
    zoomOnScroll?: boolean;
    zoomOnDoubleClick?: boolean;
    paneMoveable?: boolean;
    defaultPosition?: [number, number];
    defaultZoom?: number;
    translateExtent?: TranslateExtent;
    onMove?: (flowTransform?: FlowTransform) => void;
    onMoveStart?: (flowTransform?: FlowTransform) => void;
    onMoveEnd?: (flowTransform?: FlowTransform) => void;
}
declare const _default: ({ zoomPane, onMove, onMoveStart, onMoveEnd, zoomOnScroll, zoomOnDoubleClick, selectionKeyPressed, paneMoveable, defaultPosition, defaultZoom, translateExtent, }: UseD3ZoomParams) => void;
export default _default;
