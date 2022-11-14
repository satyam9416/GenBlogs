import './life-side.css'
import React from 'react'
import _ from 'lodash'

const LeftSide = ({ sections }) => {
    return (
        <div className='blog-left-side'>
            <h2>Sections</h2>
            <div className='section-nav-div'>
                {
                    sections.map((section) => <a key={_.kebabCase(section.heading)} href={`#${_.kebabCase(section.heading)}`}>{section.heading}</a>)
                }
            </div>
        </div>
    )
}

export default LeftSide