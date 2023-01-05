import './navbar.css'
import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import NavProfileDropdown from '../nav-profile-dropdown/nav-profile-dropdown'
import { UserAuth } from '../../context/authContext'


const Navbar = () => {

    const navigate = useNavigate()
    const [expandDropdown, setExpandDropdown] = useState(false)
    const { authData } = UserAuth()
    const ddTrigerRef = useRef()

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!ddTrigerRef.current.contains(e.target)) {
                setExpandDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }

    }, [])

    return (
        <div className='navbar'>
            <div className='logo-div' onClick={() => { navigate('/') }}>
                <img className='nav-logo-img' src="/images/GenBlogs-Logo.png" alt="" />
                <span>GenBlogs</span>
            </div>

            <ul className='nav-elements'>

                {authData !== null ?
                    <>
                        <button type='button' className='nav-new-create-btn' onClick={() => { navigate('/create-new-blog') }}>Create</button>
                        <span className='vl'></span>
                        <div className='auth-data-div' ref={ddTrigerRef}>
                            <div className='nav-account-dropdown' onClick={() => setExpandDropdown(prev => !prev)}>
                                <FaUserAlt />
                                <p>Hi, {authData?.displayName}</p>
                                <RiArrowDropDownLine />
                            </div>
                            {expandDropdown ? <NavProfileDropdown authData={authData} /> : null}
                        </div>
                    </> : <div className='nav-auth-btns'>
                        <button className='nav-sign-in-btn' onClick={() => navigate('/login')}>Sign In</button>
                        <button className='nav-sign-up-btn' onClick={() => navigate('/signup')}>Sign Up</button>
                    </div>}

            </ul>
        </div>
    )
}

export default Navbar
