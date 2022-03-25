import { NodeProps as NodePropsOriginal } from '../../../../react-flow';
import { NodeData } from "./NodeData";
export interface NodeProps extends NodePropsOriginal {
    data: NodeData;
}
