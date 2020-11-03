import styled from '@emotion/styled';
import React from 'react';
import {FaQuestion} from 'react-icons/fa';
import { PortType } from "../model/Port";

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

export interface EmptyPortProps {
    type: PortType
}

export function EmptyPort({ type } : EmptyPortProps){
    if(type == PortType.SOURCE) {
        return (
            <PortLabelIcon data-rh="Default: Allow All, not a part of NetworkPolicy" data-rh-at='right'>
                <Label>Allow All</Label>
                <div>
                    <FaQuestion style={{
                        color: 'rgb(255,192,100)'
                    }}/>
                </div>
            </PortLabelIcon>
        );
    }
    return (
        <PortLabelIconRight data-rh="Default: Allow All, not a part of NetworkPolicy" data-rh-at='left'>
            <div>
                <FaQuestion style={{
                    color: 'rgb(255,192,100)'
                }}/>
            </div>
            <Label>Allow All</Label>
        </PortLabelIconRight>
    );
};