import React from "react";
import { Sidebar } from "./Sidebar";
import { parse } from "./Parser";
import { Diagram } from "./Diagram";

const networkPolicy =
`
apiVersion: networking.k8s.io/v1
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
    const parsed = parse(networkPolicy);
    return (
        <main style={{ display: 'flex' }}>
            <div id="canvas" style={{ width: '100%' }}>
                <Diagram />
            </div>
        </main>
    )
}