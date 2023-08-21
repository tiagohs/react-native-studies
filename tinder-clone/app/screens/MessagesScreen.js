import { View, Text, TextInput, TouchableOpacity, Button, KeyboardAvoidingView, Platform, SafeAreaView, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useAuth from '../../hooks/useAuth'
import getMatchedUserInfo from '../../lib/getMatchedUserInfo'
import { useNavigation, useRoute } from '@react-navigation/native'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const MessagesScreen = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { matchDetails } = route.params;
    const userMatched = getMatchedUserInfo(matchDetails.users, user.uid);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() =>
        onSnapshot(
            collection(db, "matches", matchDetails.id, 'messages'), orderBy('timestamp', 'desc'),
            snapshot => setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        ), [matchDetails, db])

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].photoURL,
            message: input,
        });

        setInput("");
    }

    return (
        <SafeAreaView className="flex-1">
            <Header title={userMatched.displayName} callEnabled />

            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                className="flex-1"
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <FlatList
                        data={messages}
                        inverted={-1}
                        className="pl-4"
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) =>
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} message={message} />
                            ) : (
                                <ReceiverMessage key={message.id} message={message} />
                            )
                        }
                    />
                </TouchableWithoutFeedback>

                <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
                    <TextInput
                        className="h-10 text-lg"
                        placeholder='Send message...'
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />

                    <Button onPress={sendMessage} title='Send' color="#FF5864" />
                </View>
            </KeyboardAvoidingView>


        </SafeAreaView>
    )
}

export default MessagesScreen