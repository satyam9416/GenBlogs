import './blog-content.css'
import React from 'react'
import BlogTextSection from '../blog-text-section/blog-text-section'
import CodeBlockSection from '../code-block/code-block'

const BlogContent = ({ blog }) => {
    return (
        <div className='blog-content-div'>
            <h1 className='blog-heading'>{blog.name}</h1>
            <div className='blog-sections-div'>
                {
                    blog.content.map((section) => {
                        if (section.type === 'text') return <BlogTextSection key={section.heading} section={section} />
                        else if (section.type === 'code') return <CodeBlockSection key={section.code} value={section.code} />
                        return null;
                    })
                }

            </div>
        </div>
    )
}

export default BlogContent