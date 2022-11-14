import './code-editor.css';
// import React, { useRef, useState } from 'react';
import Editor from "@monaco-editor/react";
// import { Editor, EditorState } from 'draft-js';


const CodeEditor = ({ className, onChange, value }) => {
    // const editor = useRef(null)
    // function focusEditor() {
    //     editor.current.focus();
    // }

    // const [editorState, setEditorState] = useState(
    //     () => EditorState.createEmpty(),
    // );

    return (
        <div className={'code-editor ' + className}>
            <Editor
                height="15rem"
                defaultLanguage="javascript"
                defaultValue={value || ''}
                theme='vs-dark'
                onChange={onChange}
            />
        </div>
        // <div
        //     style={{ border: "1px solid black", minHeight: "6em", cursor: "text", width: '50vw' }}
        //     onClick={focusEditor}
        // >
        //     <Editor
        //         ref={editor}
        //         editorState={editorState}
        //         onChange={setEditorState}
        //         placeholder="Write something!"
        //     />
        // </div>
    );
};

export default CodeEditor;