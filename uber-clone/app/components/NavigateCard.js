import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_MAPS_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../redux/features/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from '@rneui/base';

const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="text-center py-5 text-xl">Good morning, Tiago</Text>
            <View className="border-t border-gray-200 flex-shrink">
                <View>
                    <GooglePlacesAutocomplete
                        styles={{
                            container: {
                                backgroundColor: "white",
                                paddingTop: 20,
                                flex: 0
                            },
                            textInput: {
                                backgroundColor: "#DDDDDF",
                                borderRadius: 0,
                                fontSize: 18
                            },
                            textInputContainer: {
                                paddingHorizontal: 20,
                                paddingBottom: 0
                            }
                        }}
                        placeholder="Where do?"
                        debounce={400}
                        fetchDetails={true}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }))

                            navigation.navigate('RideOptionsCard')
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_KEY,
                            language: 'en'
                        }}
                    />
                </View>

                <NavFavorites
                    onFavoritePress={(location, description) => {
                        dispatch(setDestination({
                            location: location,
                            description: description
                        }))

                        navigation.navigate("RideOptionsCard")
                    }}
                />
            </View>

            <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
                <TouchableOpacity onPress={() => navigation.navigate('RideOptionsCard')} className="flex-row justify-between bg-black w-24 px-4 py-3 rounded-full">
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text className="text-white text-center">Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row justify-between w-24 px-4 py-3 rounded-full">
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text className="text-center">Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard