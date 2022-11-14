import './auth.css'
import React, { useState } from 'react'
import useDocumentTitle from '../../context/useDocumentTitle'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

const AuthPage = ({ isNewUser = false }) => {
    useDocumentTitle('GenBlogs - ' + (isNewUser ? 'Sign Up' : 'Login'))
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    auth.onAuthStateChanged((user) => user ? navigate('/') : null)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const email = e.target.email.value.toLocaleLowerCase()
        const passwd = e.target.passwd.value
        try {
            await signInWithEmailAndPassword(auth, email, passwd);
        } catch (e) {
            setError(e.message);
            return;
        } finally {
            setLoading(false);
        };
    };

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        const name = e.target.name.value
        const email = e.target.email.value.toLocaleLowerCase()
        const passwd = e.target.passwd.value
        const confPasswd = e.target.confPasswd.value

        if (passwd === confPasswd) {
            try {
                setLoading(true);
                await createUserWithEmailAndPassword(auth, email, passwd);
                await addDoc(collection(db, 'Users'), { name, email });
            } catch (e) {
                setError(e.message);
                return;
            } finally {
                setLoading(false);
            };
        }
        else {
            setError('Password and confirm password must be same !');
            setLoading(false);
            return;
        };

    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='login-page-div'>
            <form className='login-form' onSubmit={isNewUser ? handleSignUp : handleLogin}>
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

                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
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

                        <input type="email" placeholder="Enter Email" name='email' required autoFocus={!isNewUser} />
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
                    <span onClick={() => navigate('/login')} className='auth-action-changer-span'>Login here</span>
                </p> : <p>
                    <span>Don't have an account ?&nbsp;</span>
                    <span onClick={() => navigate('/signup')} className='auth-action-changer-span'>Create a new one</span>
                </p>}
            </form>

            <div className='social-login-div'>

                <p>or sign {isNewUser ? 'up' : 'in'} using</p>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default AuthPage