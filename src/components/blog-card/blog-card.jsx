import './blog-card.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase'

const BlogCard = ({ blog }) => {
    const navigate = useNavigate()
    const [headerImg, setHeaderImg] = useState(null)

    useEffect(() => {
        const getImgUrl = async () => {
            let url = await getDownloadURL(ref(storage, 'images/' + blog.headerImg));
            setHeaderImg(url)
        }
        blog.headerImg && getImgUrl()
    }, [blog.headerImg])

    return (
        <div className='blog-card' key={blog.name} onClick={() => { navigate('/blogs/' + _.kebabCase(blog.name) + '?key=' + blog.blogID) }}>
            <img src={headerImg ? headerImg : ''} alt="" />
            <h3>{blog.name}</h3>
        </div>
    )
}

export default BlogCard