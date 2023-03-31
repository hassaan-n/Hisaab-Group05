import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from '../screens/SignUp';
import DetailsScreen from '../screens/DetailsScreen';
// import LoginScreen from '../screens/LoginScreen';
import Tut1 from '../screens/tut1';
import Tut2 from '../screens/tut2';
import Tut3 from '../screens/tut3';
import Tut4 from '../screens/tut4';
import Tut5 from '../screens/tut5';
import Tut6 from '../screens/tut6';
import StartSaving from '../screens/StartSaving';
<<<<<<< Updated upstream
import GoalScreen from '../screens/GoalScreen';
import logbook from '../screens/logbook';
=======
import GoalsScreen from '../screens/GoalScreen';
import Home from '../screens/HomeScreen';
import AddExpenseTitle from '../screens/AddExpenseTitle';
import AddExpenseCategory from '../screens/AddExpenseCategory';
import Analytics from '../screens/analytics';
import Logbook from '../screens/logbook';


//need to implement in this file
//first needs to check if intiial sigup is done, if done then load the home screen direcrlt or show pin as per settings


>>>>>>> Stashed changes


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Sign Up" component={SignUp} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Tut1" component={Tut1} />
      <HomeStack.Screen name="Tut2" component={Tut2} />
      <HomeStack.Screen name="Tut3" component={Tut3} />
      <HomeStack.Screen name="Tut4" component={Tut4} />
      <HomeStack.Screen name="Tut5" component={Tut5} />
      <HomeStack.Screen name="Tut6" component={Tut6} />
      <HomeStack.Screen name="Let's Start" component={StartSaving} />
      <HomeStack.Screen name="Goals" component={GoalScreen} />
      <HomeStack.Screen name="log" component={logbook} />
      {/* <HomeStack.Screen name="Login" component={LoginScreen} /> */}
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;