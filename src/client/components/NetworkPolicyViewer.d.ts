import { CSSProperties } from "react";
import 'react-hint/css/index.css';
import '../main.css';
export interface NetworkPolicyViewerProps {
    networkPolicy: string;
    style: CSSProperties;
    canvasStyle: CSSProperties;
}
export declare function NetworkPolicyViewer({ networkPolicy, style, canvasStyle }: NetworkPolicyViewerProps): JSX.Element;
