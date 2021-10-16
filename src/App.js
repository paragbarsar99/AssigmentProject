import React from 'react'
import { StyleSheet  } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import store from './Screens/Store/store';
import { Provider } from 'react-redux';


import Login from './Screens/Login';
import Home from './Screens/Home';
import EditProduct from './Screens/EditProduct';
import UpdateProduct from './Screens/UpdateProduct';

const Stack = createStackNavigator();


const AuthFlow = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Login"
      component={Login}
    />
  </Stack.Navigator>
)


const HomeScreen = () => (

  <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen
      name="AuthFlow"
      component={AuthFlow}

    />
    <Stack.Screen
      name="Home"
      component={Home}

    />
    <Stack.Screen
      name="EditProduct"
      component={EditProduct}
    />
    <Stack.Screen
      name="UpdateProduct"
      component={UpdateProduct}
    />


  </Stack.Navigator>
)


export default App = () => (

  <Provider store={store}>
    <NavigationContainer>
      <HomeScreen />

    </NavigationContainer>
  </Provider>
)


const styles = StyleSheet.create({})
