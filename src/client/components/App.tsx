import React, { useState } from "react";
import { Editor } from "./Editor";
import { NetworkPolicyViewer } from "./NetworkPolicyViewer";
import "github-fork-ribbon-css/gh-fork-ribbon.css"

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

    const onChange = (newNetworkPolicy) => {
        if(!newNetworkPolicy){
            return;
        }
        setNetworkPolicy(newNetworkPolicy);
    };

    return (
        <main style={{ display: 'flex' }}>
            <NetworkPolicyViewer
                networkPolicy={networkPolicy}
                style={{ display: "flex", width: "60%", height: '100vh' }}
                canvasStyle={{ width: "100%", height: '100vh'}}
            />
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