
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

import { AdjustmentsHorizontalIcon, ChevronDownIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { UserIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeatureRow from '../components/FeatureRow';
import sanityClient from '../../sanity';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->{
            ...,
          }
        }
      }
      `).then(data => {
        setFeaturedCategories(data)
      })
  }, [])

  return (
    <SafeAreaView className="bg-white pt-5">
      <View>
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image 
            className="h-7 w-2 bg-gray-300 p-4 rounded-full"
            source={{
              uri: 'https://links.papareact.com/wru'
            }}
          />

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
            <View className="flex-row items-center">
              <Text className="font-bold text-xl">Current Location</Text>
              <ChevronDownIcon size={20} color="#00CCBB" />    
            </View>
          </View>

          <UserIcon size={35} color="#00CCBB" />
        </View>

        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 items-center space-x-2 bg-gray-200 p-3">
            <MagnifyingGlassIcon size={20} color="#00CCBB" />
            <TextInput placeholder='Restaurants and ' keyboardType='default' />
          </View>

          <AdjustmentsHorizontalIcon color="#00CCBB" />
        </View>
      </View>

      <ScrollView className="bg-gray-100">
          <Categories />

          {
            featuredCategories.map(category => {

              return (
                <FeatureRow
                  id={category._id}
                  title={category.name}
                  description={category.short_description}
                />
              )
            })
          }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;