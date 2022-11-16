import './nav-profile-dropdown.css'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/authContext'

const NavProfileDropdown = () => {
    const navigate = useNavigate()
    const { authData } = UserAuth()

    const logOut = async () => {
        await signOut(auth);
        navigate('/signup')
    }

    return (
        <div className='nav-profile-dropdown'>
            <div className='nav-profile-dropdown-name-info'>
                <h2>{authData?.displayName}</h2>
                <p>{authData?.email}</p>
            </div>
            <div className='nav-profile-dropdown-actions'>
                <button>Account Dashboard</button>
                <hr />
                <button>My Blogs</button>
                <hr />
                <button>Upgrade to premium</button>
            </div>
            <button onClick={logOut}>Sign Out</button>
        </div>
    )
}

export default NavProfileDropdown