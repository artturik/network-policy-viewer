import React from 'react'
import { useStoreState, useStoreActions } from 'react-flow-renderer';

export function Sidebar() {
    const nodes = useStoreState((store) => store.nodes);
    const test = useStoreState((store) => console.log(store));

    const store = useStoreActions((actions) => actions.setOnConnectStart)

    return (
        <aside

            style={{
                display: 'block',
                width: '250px',
                height: '100vh',
                borderRight: '2px solid',
                borderColor: 'grays.500',
                paddingTop: 3
            }}
        >
            <div className="description">
                This is an example of how you can access the internal state outside of the ReactFlow component.
            </div>
            <div className="title">Nodes</div>
            {nodes.map((node) => (
                <div key={node.id}>
                    Node {node.id} - x: {node.__rf.position.x.toFixed(2)}, y: {node.__rf.position.y.toFixed(2)}
                </div>
            ))}
        </aside>
    )
}

