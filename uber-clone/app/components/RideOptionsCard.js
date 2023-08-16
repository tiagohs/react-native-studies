import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../redux/features/navSlice'

const data = [
  {
    id: "Uber-X-123",
    title: "Uber-X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  }
]
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-3 left-5 z-50 p-3 rounded-full">
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">Select a Ride - {travelTimeInformation?.distance?.text}</Text>

        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              className={`flex-row items-center justify-between px-10 ${item.id === selected?.id && 'bg-gray-200'}`}
            >
              <Image
                source={{ uri: item.image }}
                style={{ resizeMode: "contain" }}
                className="w-24 h-24"
              />
              <View>
                <Text className="text-xl font-semibold">{item.title}</Text>
                <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
              </View>
              <Text className="text-xl">{new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'BRL'
              }).format(
                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 100
              )
              }</Text>
            </TouchableOpacity>
          )}
        />

        <View className="mt-auto border-t border-gray-200">
          <TouchableOpacity disabled={!selected} className={`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
            <Text className="text-center text-white text-xl">Choose {selected?.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard