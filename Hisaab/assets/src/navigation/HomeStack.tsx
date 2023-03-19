import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import Tut1 from '../screens/tut1';
import Tut2 from '../screens/tut2';
import Tut3 from '../screens/tut3';
import Tut4 from '../screens/tut4';
import Tut5 from '../screens/tut5';
import Tut6 from '../screens/tut6';


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Tut1" component={Tut1} />
      <HomeStack.Screen name="Tut2" component={Tut2} />
      <HomeStack.Screen name="Tut3" component={Tut3} />
      <HomeStack.Screen name="Tut4" component={Tut4} />
      <HomeStack.Screen name="Tut5" component={Tut5} />
      <HomeStack.Screen name="Tut6" component={Tut6} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;