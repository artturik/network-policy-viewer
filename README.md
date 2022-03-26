Kubernetes Network Policy Viewer
===

[ONLINE DEMO](https://artturik.github.io/network-policy-viewer/)
**BETA**: You also can **edit** NetworkPolicy in the editor and visualisation will update as you type

![NetworkPolicy viewer screenshot](img/demo.png?raw=true "NetworkPolicy viewer screenshot")

View your Kubernetes NetworkPolicy manifests as graph, 
just Copy and Paste YAML to the editor and receive instant visualisation

This, hopefully, can help you find issues with NetworkPolicies
or understand NetworkPolicy concept better 

## Installation

```bash
npm install network-policy-viewer
```

## Usage

NetworkPolicyViewer can be used as React component, see the sample below or [view demo source code](src/client/components/App.tsx)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { NetworkPolicyViewer } from "network-policy-viewer";
import "network-policy-viewer/index.css"

const networkPolicy = `
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress
`;

ReactDOM.render(
    <NetworkPolicyViewer
        networkPolicy={networkPolicy}
        style={{ display: "flex", width: "100%", height: '100vh' }}
        canvasStyle={{ width: "100%", height: '100vh'}}
    />,
    document.getElementById('root')
);
```

## Credits

* [React Flow](https://github.com/wbkd/react-flow)

## License

[MIT license](LICENSE)