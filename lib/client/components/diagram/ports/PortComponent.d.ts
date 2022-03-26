import React from 'react';
import { Port } from "../model/Port";
export declare const PortLabelIconRight: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType<any>;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const Label: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType<any>;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export interface PortProps {
    port: Port;
    handleClasses: string;
}
export declare function PortComponent({ port, handleClasses }: PortProps): JSX.Element;
