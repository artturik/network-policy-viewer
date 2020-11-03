import styled from "@emotion/styled";
import React from "react";

const ErrorNotificationContainer = styled.div`
    position: absolute;
    height: fit-content;
    left: 25%;
    top: 10%;
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    padding: .75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: .25rem;
    z-index: 1000;
`;


export interface ErrorNotificationProps{
    text: string;
}

export function ErrorNotification({ text } : ErrorNotificationProps) {
    if(!text){
        return null;
    }
    return (
        <ErrorNotificationContainer>
            {text}
        </ErrorNotificationContainer>
    )
}