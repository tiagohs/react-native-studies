import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user))
    }, [matchDetails, user])

    useEffect(() =>
        onSnapshot(
            collection(db, "matches", matchDetails.id, "messages"),
            orderBy('timestamp', 'desc'), snapshot =>
            setLastMessage(snapshot.docs[0]?.data()?.message)
        )
        , [matchDetails, db])

    return matchedUserInfo && (
        <TouchableOpacity
            onPress={() => navigation.navigate('Messages', {
                matchDetails
            })}
            className="flex-row items-center py-3 px-5 bg-white mx-3 rounded-lg"
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2
            }}>
            <Image
                className="rounded-full h-16 w-16 mr-4"
                source={{
                    uri: matchedUserInfo?.photoURL
                }}
            />
            <View >
                <Text className="text-lg font-semibold">
                    {matchedUserInfo?.displayName}
                </Text>
                <Text>{lastMessage || "Say Hi!"}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default ChatRow