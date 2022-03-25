import React, { CSSProperties } from 'react';
import { Edge, Node, ConnectionLineType, ConnectionLineComponent } from '../../types';
interface EdgeRendererProps {
    edgeTypes: any;
    connectionLineType: ConnectionLineType;
    connectionLineStyle?: CSSProperties;
    onElementClick?: (event: React.MouseEvent, element: Node | Edge) => void;
    arrowHeadColor: string;
    markerEndId?: string;
    connectionLineComponent?: ConnectionLineComponent;
}
declare const _default: React.MemoExoticComponent<{
    (props: EdgeRendererProps): JSX.Element;
    displayName: string;
}>;
export default _default;
