import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'

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
    

    const signInWithGoogle = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn();

            const getToken = await GoogleSignin.getTokens()
            const { idToken, accessToken } = getToken;
            const credential = GoogleAuthProvider.credential(idToken, accessToken);

            await signInWithCredential(auth, credential);
          } catch (error) {
            console.log(error);
            return Promise.reject(error);
          }
    }

    return (
        <AuthContext.Provider
            value={{
                user: null,
                signInWithGoogle
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => {
    return useContext(AuthContext);
}