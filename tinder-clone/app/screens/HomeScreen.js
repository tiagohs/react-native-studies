import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const HomeScreen = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <TouchableOpacity>
        <Text onPress={() => signInWithGoogle()}>Click</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen