import React, {useState} from "react";
import {Editor} from "./Editor";
import { Sidebar } from "./Sidebar";
import { parse } from "./Parser";
import { Diagram } from "./Diagram";

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
    const [networkPolicyParsed, setNetworkPolicyParsed] = useState(parse(defaultNetworkPolicy));

    const onChange = (newNetworkPolicy) => {
        if(!newNetworkPolicy){
            return;
        }
        setNetworkPolicy(newNetworkPolicy);
        const parsed = parse(newNetworkPolicy);
        if(!parsed){
            alert('Error parsing NetworkPolicy');
        }
        setNetworkPolicyParsed(parsed);
    };


    return (
        <main style={{ display: 'flex' }}>
            <div id="canvas" style={{ width: '60%' }}>
                <Diagram policy={networkPolicyParsed}/>
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