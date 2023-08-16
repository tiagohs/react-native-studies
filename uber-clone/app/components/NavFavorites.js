import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'

const data = [
    {
        id: "123",
        icon: "home",
        locationName: "Home",
        destination: "Central Park Barueri",
        location: {
            lat: -23.4950443,
            lng: -46.8678692
        }
    },
    {
        id: "456",
        icon: "briefcase",
        locationName: "Work",
        destination: "Allianz Parque",
        location: {
            lat: -23.5276207,
            lng: -46.6784662
        }
    }
]

const NavFavorites = ({ onFavoritePress }) => {
    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            ItemSeparatorComponent={() => (
                <View className="bg-gray-200 h-[1]" />
            )}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onFavoritePress && onFavoritePress(item.location, item.destination)} className="flex-row items-center p-4">
                    <View className="mr-4 rounded-full bg-gray-300 p-3">
                        <Icon name={item.icon} type="ionicon" color="white" size={18} />
                    </View>
                    <View>
                        <Text className="font-semibold text-lg">{item.locationName}</Text>
                        <Text className="text-gray-500">{item.destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavorites