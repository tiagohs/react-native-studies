import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import RestaurantScreen from './app/screens/RestaurantScreen';
import { store } from './app/store'
import { Provider } from 'react-redux'
import BasketScreen from './app/screens/BasketScreen';
import PreparingOrderScreen from './app/screens/PreparingOrderScreen';
import DeliveryScreen from './app/screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Restaurant' component={RestaurantScreen} options={{
            headerShown: false
          }} />
          <Stack.Screen name='Basket' component={BasketScreen} options={{
            presentation: 'modal', headerShown: false
          }} />
          <Stack.Screen name='PreparingOrder' component={PreparingOrderScreen} options={{
            presentation: "fullScreenModal", headerShown: false
          }} />
          <Stack.Screen name='Delivery' component={DeliveryScreen} options={{
            presentation: "fullScreenModal", headerShown: false
          }} />

        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
    
  );
}