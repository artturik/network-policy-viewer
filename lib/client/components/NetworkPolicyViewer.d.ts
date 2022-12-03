import { CSSProperties } from "react";
import "react-hint/css/index.css";
import "../main.css";
export interface NetworkPolicyViewerProps {
    networkPolicy: string;
    pods?: string[];
    namespaces?: string[];
    style: CSSProperties;
    canvasStyle: CSSProperties;
}
export declare function NetworkPolicyViewer({ networkPolicy, style, canvasStyle, pods, namespaces, }: NetworkPolicyViewerProps): JSX.Element;
