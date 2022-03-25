import React, { HTMLAttributes } from 'react';
import { BackgroundVariant } from '../../types';
import './style.css';
export interface BackgroundProps extends HTMLAttributes<SVGElement> {
    variant?: BackgroundVariant;
    gap?: number;
    color?: string;
    size?: number;
}
declare const _default: React.MemoExoticComponent<{
    ({ variant, gap, size, color, style, className, }: BackgroundProps): JSX.Element;
    displayName: string;
}>;
export default _default;
