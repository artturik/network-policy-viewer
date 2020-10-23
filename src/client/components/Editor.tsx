import AceEditor from "react-ace";
import React from "react";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-monokai";

export function Editor({ source, onChange }) {
    return (
        <AceEditor
            mode="yaml"
            theme="monokai"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="100%"
            value={source}
        />
    )
}