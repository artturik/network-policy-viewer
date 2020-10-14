import React from 'react'
export function Sidebar(props) {
    return (
        <aside
            {...props}
            style={{
                display: 'block',
                width: '250px',
                height: '100vh',
                borderRight: '2px solid',
                borderColor: 'grays.500',
                paddingTop: 3
            }}
        />
    )
}

