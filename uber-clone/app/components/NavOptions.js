import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../redux/features/navSlice'

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "Map"
    },
    {
        id: "456",
        title: "Order food",
        image: "https://links.papareact.com/28w",
        screen: "Easts"
    }
]

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin)

  return (
    <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity 
                onPress={() => navigation.navigate(item.screen)} 
                className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40" 
                key={item.id}
                disabled={!origin}
            >
                <View className={`${!origin && "opacity-20"}`}>
                    <Image 
                        style={{
                            resizeMode: "contain"
                        }}
                        source={{
                            uri: item.image
                        }}
                        className="w-28 h-28"
                    />
                    <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
                    <View className="p-2 bg-black rounded-full w-10 mt-4">
                        <Icon
                            type='antdesign'
                            name="arrowright"
                            color="white"
                        />
                    </View>
                </View>
                
            </TouchableOpacity>
        )}
        horizontal
    />
  )
}

export default NavOptions;