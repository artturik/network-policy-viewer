import styled from '@emotion/styled';
import React from 'react';
import {FaBan, FaQuestion} from 'react-icons/fa';
import {Handle, Position} from "../../../../react-flow";
import {PortLabel} from "../DefaultNode";
import {Port, PortType} from "../model/Port";
import {PortDeny} from "./PortDeny";


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

export interface PortProps {
    port: Port,
    handleClasses: string,
}

export function PortComponent({ port, handleClasses } : PortProps){
    if(port.deny){
        return (
            <PortDeny port={port}/>
        )
    }
    if(port.type == PortType.SOURCE) {
        return (
            <PortLabel>
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
    }
    return (
        <PortLabel>
            <div>
                <Handle
                    id={port.id}
                    className={handleClasses}
                    type="target"
                    position={Position.Left}
                    isValidConnection={(connection) => {
                        if (connection.sourceNodeId === connection.targetNodeId) {
                            return false;
                        }

                        return !connection.toTarget;
                    }}
                />
            </div>
            <Label>{port.name}</Label>
        </PortLabel>
    );
};