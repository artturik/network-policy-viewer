import React from 'react'
import { useStoreState, useStoreActions } from '../../react-flow';

export function Sidebar() {
    const nodes = useStoreState((store) => store.nodes);
    const connectionIsPending = useStoreState((store) => store.connectionPending);

    return (
        <aside
            style={{
                display: 'block',
                width: '250px',
                height: '100vh',
                borderRight: '2px solid',
                borderColor: 'grays.500',
                paddingTop: 3,
                color: '#fff',
            }}
        >
            <div className="description">
                Connection pending: {connectionIsPending ? 'yes' : 'no'}
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

