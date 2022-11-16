import './blog.css'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Navbar from '../../components/navbar/navbar';
import LeftSide from '../../components/life-side/life-side';
import BlogContent from '../../components/blog-content/blog-content';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const BlogPage = () => {
    const [searchParams] = useSearchParams();
    const blogId = searchParams.get('key')
    const [isLoaded, setIsLoaded] = useState(false)
    const [blog, setBlog] = useState(null)
    const [error, setError] = useState(null)
    useDocumentTitle(blog ? 'GenBlogs - ' + blog.name : 'GenBlogs')

    const getBlog = async () => {

        try {
            const docSnap = await getDoc(doc(db, "Blogs", blogId));
            setBlog({ ...docSnap.data(), blogId: docSnap.id });
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        getBlog()
        // eslint-disable-next-line
    }, [])

    return (
        isLoaded && !error ?
            <>
                <Navbar />
                <div className='blog-page'>
                    <LeftSide sections={blog.content} />
                    <BlogContent blog={blog} />
                </div>
            </> : error ? <h1>Something went wrong !</h1> : <h1>Loading...</h1>
    )
}

export default BlogPage