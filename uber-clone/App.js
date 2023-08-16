import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';

import { Provider } from 'react-redux'
import { store } from './app/redux/store';
import HomeScreen from './app/screens/HomeScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './app/screens/MapScreen';
import EastsScreen from './app/screens/EastsScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? -64 : 0}
          >
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false
              }} />
              <Stack.Screen name="Map" component={MapScreen} options={{
                headerShown: false
              }} />
              <Stack.Screen name="Easts" component={EastsScreen} />
            </Stack.Navigator>
          </KeyboardAvoidingView>

        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
