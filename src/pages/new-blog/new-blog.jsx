import './new-blog.css'
import React, { useState } from 'react'
import Navbar from '../../components/navbar/navbar'
import TextSection from '../../components/text-section/text-section'
import CodeEditor from '../../components/code-editor/code-editor'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
// import { EditorState } from 'draft-js';

const NewBlogPage = () => {
    const navigate = useNavigate()
    const blogRef = collection(db, 'Blogs')


    const [newBlog, setNewBlog] = useState({
        name: '',
        content: [
            {
                type: 'text',
                heading: '',
                text: ''
            }
            , {
                type: 'code',
                code: ''
            }
        ]
    })

    const handleAddTextSection = () => {
        setNewBlog((prev) => {
            prev.content.push({
                type: 'text',
                heading: '',
                text: ''
            })
            return { ...prev };
        })
    }

    const handleAddCodeEditor = () => {
        setNewBlog((prev) => {
            prev.content.push({
                type: 'code',
                code: ''
            })
            return { ...prev };
        })
    }

    const removeSection = (i) => {
        setNewBlog((prev) => {
            prev.content.splice(i, 1)
            return { ...prev };
        })
    }
    const handleBlogNameChange = (e) => {
        setNewBlog((prev) => {
            prev.name = e.target.value
            return { ...prev }
        })
    }

    const handleTextChange = (e, i) => {
        setNewBlog((prev) => {
            prev.content[i].text = e.target.value
            return { ...prev }
        })
    }
    const handleSectionheadingChanging = (e, i) => {
        setNewBlog((prev) => {
            prev.content[i].heading = e.target.value
            return { ...prev }
        })
    }
    const handleCodeChange = (e, i) => {
        setNewBlog((prev) => {
            newBlog.content[i].code = e
            return { ...prev }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addDoc(blogRef, { ...newBlog, createdAt: Timestamp.now() });
        window.alert('Question Submitted Succesfully');
        navigate('/');
    }

    return (
        <>
            <Navbar />
            <div className='new-blog-div'>
                <input type="text" className='heading-input' placeholder='Name Your Blog !' value={newBlog.name} onChange={handleBlogNameChange} />
                {
                    newBlog.content.map((content, i) =>
                        <div className='new-content-div'>
                            <button className='Delete Sectin Button' onClick={() => removeSection(i)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FF0000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1="4" y1="7" x2="20" y2="7" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                            {
                                content.type === 'text' ?
                                    <TextSection
                                        onTextChange={(e) => handleTextChange(e, i)}
                                        onHeadingChange={(e) => handleSectionheadingChanging(e, i)} headingValue={newBlog.content[i].heading}
                                        textValue={newBlog.content[i].text}
                                    /> :
                                    <CodeEditor
                                        onChange={(e) => handleCodeChange(e, i)} value={newBlog.content[i].code}
                                    />
                            }
                        </div>
                    )
                }
                <div className='content-adder-div'>
                    <button className='section-text-add-btn' onClick={handleAddTextSection}>Add a new text section</button>
                    <button className='code-editor-add-btn' onClick={handleAddCodeEditor}>Add a new code</button>
                </div>
                <button className='submit-blog-btn' onClick={handleSubmit}>publish</button>
            </div>
        </>
    )
}

export default NewBlogPage