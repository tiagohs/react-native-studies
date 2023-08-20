import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut
} from '@firebase/auth'
import {
    auth
} from './../firebaseConfig';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () => onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }

            setLoadingInitial(false);
        }), [])

    const logout = () => {
        setLoading(true);

        signOut(auth).catch((error) => {
            setError(error)
        });
        
        setLoading(false);
    }

    const signInWithGoogle = async () => {
        try {
            setLoading(true);

            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn();

            const getToken = await GoogleSignin.getTokens()
            const { idToken, accessToken } = getToken;
            const credential = GoogleAuthProvider.credential(idToken, accessToken);

            await signInWithCredential(auth, credential);
        } catch (error) {
            setError(error);
            // if (error.code === statusCodes.SIGN_IN_CANCELLED) {

            // } else if (error.code === statusCodes.IN_PROGRESS) {
            // // operation (e.g. sign in) is in progress already
            // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // // play services not available or outdated
            // } else {
            // // some other error happened
            // }
        } finally {
            setLoading(false);
        }
    }

    const memoedValue = useMemo(() => ({
        user,
                signInWithGoogle,
                logout,
                loading,
                error
    }), [user, loading, error])

    return (
        <AuthContext.Provider
            value={memoedValue}
        >
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => {
    return useContext(AuthContext);
}