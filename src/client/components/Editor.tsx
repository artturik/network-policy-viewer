import AceEditor from "react-ace";
import React, { useEffect, useRef } from "react";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-monokai";

export function Editor({ source, onChange }) {
  const ref = useRef<any>(null);
  const editor = ref as any;
  useEffect(() => {
    editor?.current?.editor?.setShowInvisibles(true);
  }, [editor]);
  return (
    <AceEditor
      ref={ref}
      mode="yaml"
      theme="monokai"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      width="100%"
      height="100vh"
      value={source}
    />
  );
}
