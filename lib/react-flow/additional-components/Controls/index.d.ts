import React from 'react';
import './style.css';
export interface ControlProps extends React.HTMLAttributes<HTMLDivElement> {
    showZoom?: boolean;
    showFitView?: boolean;
    showInteractive?: boolean;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onFitView?: () => void;
    onInteractiveChange?: (interactiveStatus: boolean) => void;
}
declare const _default: React.MemoExoticComponent<{
    ({ style, showZoom, showFitView, showInteractive, onZoomIn, onZoomOut, onFitView, onInteractiveChange, className, }: ControlProps): JSX.Element;
    displayName: string;
}>;
export default _default;
