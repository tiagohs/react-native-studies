import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavOptions from '../components/NavOptions'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../redux/features/navSlice';
import NavFavorites from '../components/NavFavorites';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Image 
            style={{
                resizeMode: "contain"
            }}
            source={{
                uri: "https://links.papareact.com/gzs"
            }}
            className="w-24 h-24"
            
        />
        
        <GooglePlacesAutocomplete 
            styles={{
                container: {
                    flex: 0
                },
                textInput: {
                    fontSize: 18,
                }
            }}
            onPress={(data, details = null) => {
                console.log(details.geometry);
                console.log(data.description);
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                }))

                dispatch(setDestination(null))
            }}
            fetchDetails={true}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            minLengh={2}
            enablePoweredByContainer={false}
            placeholder='Where from?'
            query={{
                key: GOOGLE_MAPS_KEY,
                language: 'en'
            }}
        />

        <NavOptions />
        <NavFavorites onFavoritePress={(location, description) => {
            dispatch(setOrigin({
                location: location,
                description: description
            }))

            dispatch(setDestination(null))

            navigation.navigate("Map")
        }} />

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen