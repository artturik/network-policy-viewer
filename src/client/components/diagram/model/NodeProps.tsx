import { NodeProps as NodePropsOriginal } from 'react-flow-renderer';
import { NodeData } from "./NodeData";

export interface NodeProps extends NodePropsOriginal {
    data: NodeData;
}