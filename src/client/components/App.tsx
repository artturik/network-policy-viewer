import React from "react";
import { Sidebar } from "./Sidebar";
import { Diagram } from "./Diagram";

export function App(){
    return (
        <main style={{ display: 'flex' }}>
            <Sidebar>
            </Sidebar>
            <div id="canvas" style={{ width: '100%' }}>
                <Diagram />
            </div>
        </main>
    )
}