import styled from '@emotion/styled';
import React, {memo} from 'react';
import {Position, Handle, useStoreState} from '../../../react-flow';
import {NodeProps} from './model/NodeProps';
import {PortType} from "./model/Port";
import cc from 'classcat';

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

export const Label = styled.div`
		padding: 0 5px;
		flex-grow: 1;
	`;

export default memo(({ data, id } : NodeProps) => {
    const connectionPending = useStoreState(state => state.connectionPending);
    const connectionOnlyNodeId = useStoreState(state => state.connectionOnlyNodeId);

    const handleClasses = cc(['port', {
        "react-flow__handle-connecting" : connectionPending && connectionOnlyNodeId !== id,
    }]);
    return (
        <>
            <Title>
                <TitleName>{ data.name }</TitleName>
            </Title>
            <Ports>
                <PortsContainer>
                    { data.ports
                        .filter(port => port.type === PortType.TARGET)
                        .map(port => {
                            return (
                                <PortLabel key={port.id}>
                                    <div>
                                        <Handle
                                            id={port.id}
                                            className={handleClasses}
                                            type="target"
                                            position={Position.Left}
                                            isValidConnection={(connection) => {
                                                if(connection.sourceNodeId === connection.targetNodeId){
                                                    return false;
                                                }

                                                return !connection.toTarget;
                                            }}
                                        />
                                    </div>
                                    <Label>{port.name}</Label>
                                </PortLabel>
                            );
                        })
                    }
                </PortsContainer>
                <PortsContainer>
                    { data.ports
                        .filter(port => port.type === PortType.SOURCE)
                        .map(port => {
                            return (
                                <PortLabel key={port.id}>
                                    <Label>{port.name}</Label>
                                    <div>
                                        <Handle
                                            id={port.id}
                                            className={handleClasses}
                                            type="source"
                                            position={Position.Right}
                                            isValidConnection={(connection) => {
                                                if(connection.sourceNodeId === connection.targetNodeId){
                                                    return false;
                                                }

                                                return connection.toTarget;
                                            }}
                                        />
                                    </div>
                                </PortLabel>
                            );
                        })
                    }
                </PortsContainer>
            </Ports>
        </>
    );
});