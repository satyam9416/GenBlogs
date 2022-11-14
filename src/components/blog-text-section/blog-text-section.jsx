import './blog-text-section.css'
import React from 'react'
import _ from 'lodash'

const BlogTextSection = ({ section }) => {
    return (
        <div className='blog-text-section' id={_.kebabCase(section.heading)}>
            <h3>{section.heading}</h3>
            <p>{section.text}</p>
        </div>
    )
}

export default BlogTextSection