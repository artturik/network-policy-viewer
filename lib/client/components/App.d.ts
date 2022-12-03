/// <reference types="react" />
import "react-tabs/style/react-tabs.css";
import "github-fork-ribbon-css/gh-fork-ribbon.css";
import "../app.css";
export declare const defaultPods = "apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\n  labels:\n    role: web\n  namespace: project\nspec:\n  containers:\n  - name: nginx\n    image: nginx:1.14.2\n    ports:\n    - containerPort: 80\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: app\n  labels:\n    role: app\n  namespace: project\nspec:\n  containers:\n  - name: app\n    image: app:1.0.0\n    ports:\n    - containerPort: 80\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  labels:\n    role: cache\n  name: redis\n  namespace: project\nspec:\n  containers:\n  - name: redis\n    image: redis:latest\n    ports:\n    - containerPort: 3306\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  labels:\n    role: db\n  name: db\nspec:\n  containers:\n  - name: mysql\n    image: mysql:latest\n    ports:\n    - containerPort: 6379";
export declare const defaultNamespace = "apiVersion: v1\nkind: Namespace\nmetadata:\n  labels:\n    name: default\n  name: default\n---\napiVersion: v1\nkind: Namespace\nmetadata:\n  labels:\n    name: project\n    project: project\n  name: project\n";
export declare function App(): JSX.Element;
