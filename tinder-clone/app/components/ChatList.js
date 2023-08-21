import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import useAuth from '../../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = () => {
    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(() => onSnapshot(collection(db, 'matches'), where('usersMatched', 'array-contains', user.uid), (snapshot) => {
        setMatches(
            snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        )
    }), [])

    return matches.length > 0 ? (
        <FlatList
            className="h-full"
            keyExtractor={item => item.id}
            data={matches}
            renderItem={({ item }) => (
                <ChatRow key={item.id} matchDetails={item} />
            )}
        />
    ) : (
        <View className="p-5">
            <Text className="text-center text-lg">No matches at the moment.</Text>
        </View>
    )
}

export default ChatList