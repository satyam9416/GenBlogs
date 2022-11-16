import './home.css'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/navbar'
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import BlogCard from '../../components/blog-card/blog-card';

const HomePage = () => {
    const [blogs, setBlogs] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    useDocumentTitle('GenBlogs - Home')

    const getBlogs = async () => {
        const blogCollectionRef = collection(db, 'Blogs');
        const docsSnap = await getDocs(blogCollectionRef);
        const blogs = docsSnap.docs.map((blog) => ({ ...blog.data(), blogID: blog.id }));
        setBlogs(blogs)
        setIsLoaded(true)
    };

    useEffect(() => {
        getBlogs()
    }, [])

    return (
        isLoaded ?
            <>
                <Navbar />
                <div className='home-hero-section'>
                    <img src="/images/header.jpg" alt="" />
                    <h1 className='home-page-heading'>Reading is&nbsp; <span>fun</span>-damental</h1>
                </div>
                <div className='blogs-div'>
                    {blogs.map((blog) => <BlogCard key={blog.name} blog={blog} />)}
                </div>
            </> : <h1>Loading...</h1>
    )
}

export default HomePage