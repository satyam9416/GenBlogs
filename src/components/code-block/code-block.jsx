import './code-block.css'
import React from 'react'
import { CopyBlock, dracula } from "react-code-blocks";

const CodeBlockSection = ({ value }) => {
    return (
        <div className='code-block'>

            <CopyBlock
                language='javascript'
                text={value}
                showLineNumbers
                theme={dracula}
                wrapLines={true}
                codeBlock
            />
        </div>
    )
}

export default CodeBlockSection