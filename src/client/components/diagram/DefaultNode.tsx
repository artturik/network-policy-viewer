import styled from '@emotion/styled';
import React, {memo} from 'react';
import {useStoreState} from '../../../react-flow';
import {NodeProps} from './model/NodeProps';
import {PortType} from "./model/Port";
import cc from 'classcat';
import { EmptyPort } from "./ports/EmptyPort";
import {PortComponent} from "./ports/PortComponent";

export const Title = styled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;

export const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;

export const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

export const PortsContainer = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		&:first-of-type {
			margin-right: 10px;
		}
		&:only-child {
			margin-right: 0px;
		}
	`;

export const PortLabel = styled.div`
		display: flex;
		margin-top: 1px;
		align-items: center;
	`;

export const PortLabelIcon = styled.div`
		display: flex;
		margin-top: 2px;
		margin-left: 4px;
		align-items: center;
	`;

export const PortLabelIconRight = styled.div`
		display: flex;
		margin-top: 2px;
		margin-right: 4px;
		align-items: center;
	`;

export const Label = styled.div`
		padding: 0 5px;
		flex-grow: 1;
	`;

export default memo(({ data, id } : NodeProps) => {
    const connectionPending = useStoreState(state => state.connectionPending);
    const connectionOnlyNodeId = useStoreState(state => state.connectionOnlyNodeId);
    const inputs = data.ports.filter(port => port.type === PortType.TARGET);
    const outputs = data.ports.filter(port => port.type === PortType.SOURCE);

    const handleClasses = cc(['port', {
        "react-flow__handle-connecting" : connectionPending && connectionOnlyNodeId !== id,
    }]);
    return (
        <div style={{
            backgroundColor: data.isPartOfNetworkPolicy ? 'rgb(192,255,0)' : ''
        }}>
            <Title>
                <TitleName>{ data.name }</TitleName>
            </Title>
            <Ports>
                <PortsContainer>
                    { inputs.length === 0 && data.isPartOfNetworkPolicy &&
                        <EmptyPort type={PortType.TARGET}/>
                    }
                    { inputs.map(port => <PortComponent key={port.id} port={port} handleClasses={handleClasses} />)}
                </PortsContainer>
                <PortsContainer>
                    { outputs.length === 0 && data.isPartOfNetworkPolicy &&
                        <EmptyPort type={PortType.SOURCE}/>
                    }
                    { outputs.map(port => <PortComponent key={port.id} port={port} handleClasses={handleClasses} />)}
                </PortsContainer>
            </Ports>
        </div>
    );
});