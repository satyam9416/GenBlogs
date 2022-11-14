import './text-section.css'
import React from 'react'

const TextSection = ({ className, onTextChange, onHeadingChange, headingValue, textValue }) => {
    return (
        <div className={'text-section ' + className}>
            <input type="text" className={'text-section-heading-input ' + className + 'heading-input'} onChange={onHeadingChange} value={headingValue} placeholder='Section Heading...' />
            <textarea className={'text-section-text-input' + className + 'text-input'} onChange={onTextChange} value={textValue} placeholder='Write your content here...' />
        </div>
    )
}

export default TextSection