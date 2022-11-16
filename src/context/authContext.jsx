import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithRedirect, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import React, { createContext, useEffect, useState, useContext } from 'react'
import { auth, db } from '../firebase'
const authContext = createContext()

export const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const handleSignIn = async (email, passwd) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, passwd)
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        };
    }

    const handleSignUp = async (name, email, passwd) => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, passwd).then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: name
                })
            });
            await addDoc(collection(db, 'Users'), { name, email });
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        };
    }

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        setLoading(true)
        try {
            await signInWithRedirect(auth, provider).then((user) => {
                console.log(user)
            })
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        };
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthData(user)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <authContext.Provider value={{ authData, loading, authError: error, handleSignIn, handleSignUp, handleGoogleSignIn }}>
            {children}
        </authContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(authContext)
}