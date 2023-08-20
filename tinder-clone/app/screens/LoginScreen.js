import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signInWithGoogle } = useAuth();

  return (
    <View className="flex-1">
      <ImageBackground 
        className="flex-1"
        resizeMode='cover'
        source={{
          uri: "https://tinder.com/static/tinder.png"
        }}>
        <TouchableOpacity onPress={() => signInWithGoogle()} className="absolute bottom-40 w-52 p-4 mx-[25%] bg-white rounded-2xl">
          <Text className="font-semibold text-center">Sign in & get swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen