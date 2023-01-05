import './auth.css'
import React, { useState, useRef, useEffect } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { auth } from '../../firebase'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/authContext';

const AuthPage = ({ isNewUser = false }) => {
    const emailInputRef = useRef()
    useDocumentTitle('GenBlogs - ' + (isNewUser ? 'Sign Up' : 'Login'))
    const location = useLocation()
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { handleGoogleSignIn, handleSignUp, handleSignIn, loading, authError } = UserAuth()
    let redirectUrl;

    useEffect(() => {
        if (!isNewUser) {
            emailInputRef.current.focus()
        }
        
    }, [isNewUser])
    
    const getRedirectUrl = () => {
        if (!location?.state?.previousURL) return '/'
        if (!location?.state?.params) return location.state.previousURL;
        let url = location.state.previousURL + '?'
        Object.keys(location.state.params).forEach((key) => {
            console.log(`${key}: ${location.state.params[key]}`);
            url += `${key}=${location.state.params[key]}&`
        });
        return url;
    }

    redirectUrl = getRedirectUrl()

    auth.onAuthStateChanged((user) => {
        if (!user) return;
        navigate(redirectUrl)
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        const email = e.target.email.value.toLocaleLowerCase()
        const passwd = e.target.passwd.value
        await handleSignIn(email, passwd)
        setError(authError.message)
    };

    const SignUp = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value.toLocaleLowerCase()
        const passwd = e.target.passwd.value
        const confPasswd = e.target.confPasswd.value

        if (passwd === confPasswd) {
            handleSignUp(name, email, passwd)
            setError(authError.message)
        }
        else {
            setError('Password and confirm password must be same !');
            return;
        };
    }

    const handleFacebookSignIN = async () => { }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='login-page-div'>
            <form className='login-form' onSubmit={isNewUser ? SignUp : handleLogin}>
                <div className='login-logo-div'>
                    <img className='login-logo-img' src="/images/GenBlogs-Logo.png" alt="" />
                </div>
                <h2>Sign {isNewUser ? 'Up' : 'In'}</h2>
                <p>Please sign {isNewUser ? 'up' : 'in'} to get full access to our platform</p>

                {error ? <div className='auth-error-div'>
                    <p>{error}</p>
                </div> : null}

                <div className='auth-inputs-wrapper'>

                    {isNewUser ? <div className='name-input-div login-cred-input-div'>

                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="7" r="4" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>

                        <input type="text" placeholder="Enter Name" name='name' required autoFocus />
                    </div> : null}

                    <div className='email-input-div login-cred-input-div'>

                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <polyline points="3 7 12 13 21 7" />
                        </svg>

                        <input type="email" placeholder="Enter Email" name='email' ref={emailInputRef} />
                    </div>
                </div>
                <div className='auth-inputs-wrapper'>
                    <div className='pass-input-div login-cred-input-div'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <rect x="5" y="11" width="14" height="10" rx="2" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                        </svg>

                        <input type={showPassword ? "text" : "password"} placeholder="Enter Password" name='passwd' required />
                    </div>

                    {isNewUser ? <div className='conf-pass-input-div login-cred-input-div'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <rect x="5" y="11" width="14" height="10" rx="2" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                        </svg>

                        <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name='confPasswd' required />
                    </div> : null}
                </div>

                <div className='extras-div'>
                    <label htmlFor="showPass" className='show-pass-label'>
                        <input type="checkbox" id='showPass' value={showPassword} onChange={() => setShowPassword(prev => !prev)} />Show Password
                    </label>
                    {!isNewUser ? <a href="/">i forgot my password ?</a> : null}
                </div>

                <button disabled={loading} type="submit" className='login-btn'> Sign {isNewUser ? 'up' : 'in'} </button>

                {isNewUser ? <p>
                    <span>Already have an account ?&nbsp;</span>
                    <span onClick={() => navigate('/login', location?.state !== undefined ? { state: location.state } : '')} className='auth-action-changer-span'>Login here</span>
                </p> : <p>
                    <span>Don't have an account ?&nbsp;</span>
                    <span onClick={() => navigate('/signup', location?.state !== undefined ? { state: location.state } : '')} className='auth-action-changer-span'>Create a new one</span>
                </p>}
            </form>

            <div className='social-login-div'>

                <p>or sign {isNewUser ? 'up' : 'in'} using</p>

                <div>
                    <svg onClick={handleGoogleSignIn} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                    </svg>

                    <svg onClick={handleFacebookSignIN} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
