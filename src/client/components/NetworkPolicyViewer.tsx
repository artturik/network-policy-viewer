import React, { CSSProperties } from "react";
import ReactHintFactory from "react-hint";
import { ErrorNotification } from "./ErrorNotification";
import {
  networkPolicyToElementsWithPosition,
  parse,
  parseResource,
} from "./Parser";
import { Diagram } from "./Diagram";
import "react-hint/css/index.css";
import "../main.css";
import { Pod } from "./models/Pod";
import { Namespace } from "./models/Namespace";

const ReactHint = ReactHintFactory(React);

export interface NetworkPolicyViewerProps {
  networkPolicy: string;
  pods?: string[];
  namespaces?: string[];
  style: CSSProperties;
  canvasStyle: CSSProperties;
}

export function NetworkPolicyViewer({
  networkPolicy,
  style,
  canvasStyle,
  pods,
  namespaces,
}: NetworkPolicyViewerProps) {
  let error = "";
  let parsedElements;

  try {
    const parsedNetworkPolicy = parse(networkPolicy);
    if (!parsedNetworkPolicy) {
      error = "Error parsing NetworkPolicy manifest!";
    }

    let parsedPods: Pod[] = [];
    if (pods) {
      parsedPods = parseResource<Pod>(pods, Pod);
    }

    let parsedNamespaces: Namespace[] = [];
    if (namespaces) {
      parsedNamespaces = parseResource<Namespace>(namespaces, Namespace);
    }

    if (parsedNetworkPolicy) {
      parsedElements = networkPolicyToElementsWithPosition(
        parsedNetworkPolicy,
        parsedPods,
        parsedNamespaces
      );
    }
  } catch (e) {
    error = "Can not visualize NetworkPolicy!";
    console.error(e);
  }

  return (
    <div style={style}>
      <ErrorNotification text={error} />
      {error === "" && (
        <>
          <ReactHint autoPosition events />
          <div class="network-policy-viewer-canvas" style={canvasStyle}>
            <Diagram elements={parsedElements} />
          </div>
        </>
      )}
    </div>
  );
}
