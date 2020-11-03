import styled from '@emotion/styled';
import React from 'react';
import {FaBan, FaQuestion} from 'react-icons/fa';
import {Port, PortType} from "../model/Port";

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

export interface PortDenyProps {
    port: Port
}

export function PortDeny({ port } : PortDenyProps){
    if(port.type == PortType.SOURCE) {
        return (
            <PortLabelIcon data-rh="Deny Out" data-rh-at='right'>
                <Label>{port.name}</Label>
                <div>
                    <FaBan style={{
                        color: 'rgb(255,100, 0)'
                    }}/>
                </div>
            </PortLabelIcon>
        );
    }
    return (
        <PortLabelIconRight data-rh="Deny In" data-rh-at='left'>
            <div>
                <FaBan style={{
                    color: 'rgb(255,100, 0)'
                }}/>
            </div>
            <Label>{port.name}</Label>
        </PortLabelIconRight>
    );
};