import styled from '@emotion/styled';
import React, {memo} from 'react';
import {Handle, NodeProps, Position} from 'react-flow-renderer';

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

export const Port = styled.div`
		width: 15px;
		height: 15px;
		background: rgba(white, 0.1);
		&:hover {
			background: rgb(192, 255, 0);
		}
	`;

export default memo(({ data } : NodeProps) => {
    return (
        <>
            <Title>
                <TitleName>{ data.name }</TitleName>
            </Title>
            <Ports>
                <PortsContainer>
                    <PortLabel>
                        <div>
                            <Handle
                                id="a"
                                className="port"
                                type="target"
                                position={Position.Left}
                                onConnect={(params) => console.log('handle onConnect', params)}
                            />
                        </div>
                        <Label>In</Label>
                    </PortLabel>
                    <PortLabel>
                        <div>
                            <Handle
                                id="b"
                                className="port"
                                type="target"
                                position={Position.Left}
                                onConnect={(params) => console.log('handle onConnect', params)}
                            />
                        </div>
                        <Label>In</Label>
                    </PortLabel>
                </PortsContainer>
                <PortsContainer>
                    <PortLabel>
                        <Label>Out</Label>
                        <div>
                            <Handle
                                id="out"
                                className="port"
                                type="source"
                                position={Position.Right}
                                onConnect={(params) => console.log('handle onConnect', params)}
                            />
                        </div>
                    </PortLabel>
                </PortsContainer>
            </Ports>
        </>
    );
});