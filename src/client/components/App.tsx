import React, { useState } from "react";
import { Editor } from "./Editor";
import { NetworkPolicyViewer } from "./NetworkPolicyViewer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as yaml from "js-yaml";
import "react-tabs/style/react-tabs.css";
import "github-fork-ribbon-css/gh-fork-ribbon.css";
import "../app.css";

const defaultNetworkPolicy = `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: project
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
          project: project
    - podSelector:
        matchLabels:
          role: app
    ports:
    - protocol: TCP
      port: 3306
  egress:
  - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978
`;

export const defaultPods = `apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    role: web
  namespace: project
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
---
apiVersion: v1
kind: Pod
metadata:
  name: app
  labels:
    role: app
  namespace: project
spec:
  containers:
  - name: app
    image: app:1.0.0
    ports:
    - containerPort: 80
---
apiVersion: v1
kind: Pod
metadata:
  labels:
    role: cache
  name: redis
  namespace: project
spec:
  containers:
  - name: redis
    image: redis:latest
    ports:
    - containerPort: 3306
---
apiVersion: v1
kind: Pod
metadata:
  labels:
    role: db
  name: db
spec:
  containers:
  - name: mysql
    image: mysql:latest
    ports:
    - containerPort: 6379`;

export const defaultNamespace = `apiVersion: v1
kind: Namespace
metadata:
  labels:
    name: default
  name: default
---
apiVersion: v1
kind: Namespace
metadata:
  labels:
    name: project
    project: project
  name: project
`;

export function App() {
  const [networkPolicy, setNetworkPolicy] = useState(defaultNetworkPolicy);
  const [pods, setPods] = useState(defaultPods);
  const [namespace, setNamespace] = useState(defaultNamespace);

  const onChange = (newNetworkPolicy) => {
    if (!newNetworkPolicy) {
      return;
    }
    setNetworkPolicy(newNetworkPolicy);
  };

  const onChangePods = (pods) => {
    if (!pods) {
      return;
    }
    setPods(pods);
  };

  const onChangeNamespace = (namespace) => {
    if (!namespace) {
      return;
    }
    setNamespace(namespace);
  };

  const splitToKubeResourcesToArray = (manifest: string): string[] => {
    const resourceArray: string[] = [];
    try {
      yaml.loadAll(manifest).forEach((resource) => {
        try {
          resourceArray.push(yaml.dump(resource));
        } catch (e) {
          console.error(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
    return resourceArray;
  };

  const podsArray = splitToKubeResourcesToArray(pods);
  const namespaceArray = splitToKubeResourcesToArray(namespace);

  return (
    <main style={{ display: "flex" }}>
      <NetworkPolicyViewer
        networkPolicy={networkPolicy}
        pods={podsArray}
        namespaces={namespaceArray}
        style={{ display: "flex", width: "60%", height: "100vh" }}
        canvasStyle={{ width: "100%", height: "100vh" }}
      />
      <pre
        style={{
          width: "40%",
          margin: 0,
          paddingY: 2,
          paddingX: 3,
          height: "100vh",
          overflow: "scroll",
          "> pre": { margin: 0 },
        }}
      >
        <Tabs>
          <TabList>
            <Tab>NetworkPolicy</Tab>
            <Tab>Pod</Tab>
            <Tab>Namespace</Tab>
          </TabList>

          <TabPanel>
            <Editor source={networkPolicy} onChange={onChange} />
          </TabPanel>
          <TabPanel>
            <Editor source={pods} onChange={onChangePods} />
          </TabPanel>
          <TabPanel>
            <Editor source={namespace} onChange={onChangeNamespace} />
          </TabPanel>
        </Tabs>
      </pre>
    </main>
  );
}
