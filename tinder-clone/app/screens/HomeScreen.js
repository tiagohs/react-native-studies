import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'

import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import {
  AntDesign, Entypo, Ionicons
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper'
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const DUMMY_DATA = [
  {
    id: 123,
    displayName: "Tiago Silva",
    job: "Software Developer",
    photoURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    age: 21
  },
  {
    id: 423,
    displayName: "Tiago Silva",
    job: "Mobile Developer",
    photoURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    age: 29
  },
  {
    id: 4530,
    displayName: "Tiago Silva",
    job: "Mobile Developer",
    photoURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    age: 29
  },
  {
    id: 4233,
    displayName: "Tiago Silva",
    job: "Mobile Developer",
    photoURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    age: 29
  },
  {
    id: 4293,
    displayName: "Tiago Silva",
    job: "Mobile Developer",
    photoURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    age: 29
  },
  {
    id: 4213,
    displayName: "Tiago Silva",
    job: "Mobile Developer",
    photoURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    age: 29
  }
]

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(() =>
    onSnapshot(doc(db, 'users', user.uid), snapshot => {
      if (!snapshot.exists()) {
        navigation.navigate('Modal');
      }
    }), [])

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then(snapshot => snapshot.docs.map(doc => doc.id));
      const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then(snapshot => snapshot.docs.map(doc => doc.id));
      
      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipesUserIds = swipes.length > 0 ? swipes : ['test'];

      unsub = onSnapshot(
        query(
          collection(db, 'users'), 
          where('id', 'not-in', [...passedUserIds, ...swipesUserIds])
        ), snapshot => {
          setProfiles(
            snapshot.docs
              .filter(doc => doc.id !== user.uid)
              .map(doc => ({
                id: doc.id,
                ...doc.data()
              })
              )
          )
        })
    }

    fetchCards();

    return unsub;
  }, [])

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped)
  }

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped)
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-5">
        <TouchableOpacity onPress={() => logout()}>
          <Image
            className="w-10 h-10 rounded-full"
            source={{
              uri: user.photoURL
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image
            className="h-16 w-16"
            source={require('./../../assets/tinder-logo.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons
            size={30}
            name="chatbubbles-sharp"
            color="#FF5864"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          containerStyle={{
            backgroundColor: "transparent"
          }}
          stackSize={5}
          cardIndex={0}
          cards={profiles}
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex)
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex)
          }}
          backgroundColor="#4FD0F9"
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              }
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30"
                }
              }
            }
          }}
          renderCard={card => card ? (
            <View
              key={card.id}
              className="relative bg-white h-3/4 rounded-xl">
              <Image
                className="top-0 h-full w-full rounded-t-xl"
                source={{ uri: card.photoURL }}
              />

              <View
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2
                }}
                className="bg-white bototom-0 w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl">
                <View>
                  <Text className="text-xl font-bold">{card.displayName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text className="text-2xl font-bold">{card.age}</Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2
              }}
              className="relative bg-white h-3/4 rounded.xl justify-center items-center">
              <Text className="font-bold pb-5">No more profiles</Text>
              <Image
                className="h-20 w-full"
                resizeMode='contain'
                source={{
                  uri: "https://links.papareact.com/6gb"
                }}
              />
            </View>
          )}
        />
      </View>

      <View className="flex-row justify-evenly">
        <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} className="items-center justify-center rounded-full w-16 h-16 bg-red-200">
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} className="items-center justify-center rounded-full w-16 h-16 bg-green-200">
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen