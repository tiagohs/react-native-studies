import { View, Text, Image, TextInput, Touchable, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const ModalScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [ image, setImage ] = useState(null);
    const [ job, setJob ] = useState(null);
    const [ age, setAge ] = useState(null);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp()
        }).then(() => {
            navigation.goBack()
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <SafeAreaView className="flex-1 items-center pt-1">
            <Image
                className="h-20 w-full"
                resizeMode='contain'
                source={{
                    uri: "https://links.papareact.com/2pf"
                }}
            />
            <Text className="text-xl text-gray-500 p-2 font-bold">Welcome {user.displayName}</Text>

            <Text className="text-center p-4 font-bold text-red-400">Step 1: Thr Profile Pic</Text>
            <TextInput
                value={image}
                placeholder='Enter a profile pick URL'
                className="text-center text-xl pb-2"
                onChangeText={text => setImage(text)}
            />

            <Text className="text-center p-4 font-bold text-red-400">Step 2: The Job</Text>
            <TextInput
                value={job}
                placeholder='Enter your age'
                className="text-center text-xl pb-2"
                onChangeText={text => setJob(text)}
            />

            <Text className="text-center p-4 font-bold text-red-400">Step 3: The Age</Text>
            <TextInput
                value={age}
                placeholder='Enter your occupation'
                className="text-center text-xl pb-2"
                onChangeText={text => setAge(text)}
                keyboardType='numeric'
                maxLength={2}
            />

            <TouchableOpacity onPress={() => updateUserProfile()} disabled={incompleteForm} className={`w-64 p-3 rounded-xl absolute bottom-10 ${incompleteForm ? "bg-gray-400" : "bg-red-400"}`}>
                <Text className="text-center text-white text-xl">Update Profile</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ModalScreen