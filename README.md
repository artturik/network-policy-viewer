Network Policy Viewer
===

[DEMO](https://artturik.github.io/network-policy-viewer/)

![NetworkPolicy viewer screenshot](img/demo.png?raw=true "NetworkPolicy viewer screenshot")

View your Kubernetes NetworkPolicy manifests as graph

This, hopefully, can help you find issues with NetworkPolicies
or understand NetworkPolicy concept better 

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
  egress:
  - to:
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
  ingress:
  - from:
    - ipBlock:
        cidr: 10.0.0.0/24
