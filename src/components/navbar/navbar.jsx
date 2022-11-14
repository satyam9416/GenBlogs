import './navbar.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FaUserAlt } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'

const Navbar = () => {

    const navigate = useNavigate()
    const [authData, setAuthData] = useState(null)

    const getAuthData = async () => {
        console.log(auth.currentUser.email)
        const q = query(collection(db, 'Users'), where('email', '==', auth.currentUser.email.toLocaleLowerCase()));

        try {
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data());
            setAuthData({ ...data[0] });
        } catch (error) {
            console.log(error)
        };
    };

    useEffect(() => { auth.currentUser && getAuthData() }, [])

    return (
        <div className='navbar'>
            <div className='logo-div' onClick={() => { navigate('/') }}>
                <img className='nav-logo-img' src="/images/GenBlogs-Logo.png" alt="" />
                <span>GenBlogs</span>
            </div>

            <ul className='nav-elements'>

                {auth.currentUser ?
                    <>
                        <button type='button' className='nav-new-create-btn' onClick={() => { navigate('/create-new-blog') }}>Create</button>
                        <span className='vl'></span>
                        <div className='auth-data-div'>
                            <FaUserAlt />
                            <p>Hi, {authData?.name}</p>
                            <RiArrowDropDownLine />
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