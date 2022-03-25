import React, { CSSProperties } from "react";
import ReactHintFactory from 'react-hint'
import { ErrorNotification } from "./ErrorNotification";
import { networkPolicyToElementsWithPosition, parse } from "./Parser";
import { Diagram } from "./Diagram";
import 'react-hint/css/index.css';
import '../main.css';

const ReactHint = ReactHintFactory(React);

export interface NetworkPolicyViewerProps {
    networkPolicy: string,
    style: CSSProperties;
    canvasStyle: CSSProperties;
}

export function NetworkPolicyViewer({ networkPolicy, style, canvasStyle }: NetworkPolicyViewerProps){
    let error = '';
    let parsedElements;

    try{
        const parsed = parse(networkPolicy);
        if(!parsed){
            error = 'Error parsing NetworkPolicy manifest!';
        }

        if(parsed){
            parsedElements = networkPolicyToElementsWithPosition(parsed);
        }
    } catch (e) {
        error = 'Can not visualize NetworkPolicy!';
        console.error(e);
    }

    return (
        <div style={style}>
            <ErrorNotification text={error}/>
            { error === '' &&
                <>
                    <ReactHint autoPosition events />
                    <div id="canvas" style={canvasStyle}>
                        <Diagram elements={parsedElements}/>
                    </div>
                </>
            }
        </div>
    )
}