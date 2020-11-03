import React, {useState} from "react";
import ReactHintFactory from 'react-hint'
import {Editor} from "./Editor";
import { Sidebar } from "./Sidebar";
import { networkPolicyToElementsWithPosition, parse} from "./Parser";
import { Diagram } from "./Diagram";
import 'react-hint/css/index.css'

const ReactHint = ReactHintFactory(React);
const defaultNetworkPolicy =
`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - ipBlock:
        cidr: 172.17.0.0/16
        except:
        - 172.17.1.0/24
    - namespaceSelector:
        matchLabels:
          project: myproject
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 6379
  egress:
  - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978
`;


export function App(){
    const [networkPolicy, setNetworkPolicy] = useState(defaultNetworkPolicy);
    const [elements, setElements] = useState(networkPolicyToElementsWithPosition(parse(defaultNetworkPolicy)));

    const onChange = (newNetworkPolicy) => {
        if(!newNetworkPolicy){
            return;
        }
        setNetworkPolicy(newNetworkPolicy);

        const parsed = parse(newNetworkPolicy);
        if(!parsed){
            alert('Error parsing NetworkPolicy manifest!');
            return;
        }

        let parsedElements;
        try{
            parsedElements = networkPolicyToElementsWithPosition(parsed);
        } catch (e) {
            alert('Can not visualize NetworkPolicy!');
            console.error(e);
            return;
        }
        setElements(parsedElements);
    };


    return (
        <main style={{ display: 'flex' }}>
            <ReactHint autoPosition events />
            <div id="canvas" style={{ width: '60%' }}>
                <Diagram elements={elements}/>
            </div>
            <pre
                style={{
                    width: '40%',
                    margin: 0,
                    paddingY: 2,
                    paddingX: 3,
                    height: '100vh',
                    overflow: 'scroll',
                    '> pre': { margin: 0 }
                }}
            >
                <Editor source={networkPolicy} onChange={onChange}/>
            </pre>
        </main>
    )
}