import * as React from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';

import HomeStackNavigator from './HomeStack';


const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(0, 0, 0)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
const RootNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;


