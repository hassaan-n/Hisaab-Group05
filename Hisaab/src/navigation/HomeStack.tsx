import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../screens/SignUp";
import DetailsScreen from "../screens/DetailsScreen";
// import LoginScreen from '../screens/LoginScreen';
import Tut1 from "../screens/tut1";
import Tut2 from "../screens/tut2";
import Tut3 from "../screens/tut3";
import Tut4 from "../screens/tut4";
import Tut5 from "../screens/tut5";
import Tut6 from "../screens/tut6";
import StartSaving from "../screens/StartSaving";
import GoalsScreen from "../screens/GoalScreen";
import Home from "../screens/HomeScreen";
import AddExpenseTitle from "../screens/AddExpenseTitle";
import AddExpenseCategory from "../screens/AddExpenseCategory";
import Analytics from "../screens/analytics";
import Logbook from "../screens/Logbook";
import Profile from "../screens/Profile";
import ProfileNameSetting from "../screens/ProfileNameSetting";
import PinSetting from "../screens/PinSetting";
import NotificationSetting from "../screens/NotificationSetting";
import BudgetSetting from "../screens/BudgetSetting";
import GoalSetting from "../screens/GoalSetting";

//need to implement in this file
//first needs to check if intiial sigup is done, if done then load the home screen direcrlt or show pin as per settings

const HomeStack = createNativeStackNavigator();
const InitSetup = true;

const HomeStackNavigator = () => {
  let content = null;

  //if initial setup is set to true then add the signup screen to the stack

  if (InitSetup) {
    content = (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Sign Up" component={SignUp} />
        <HomeStack.Screen name="Details" component={DetailsScreen} />
        <HomeStack.Screen name="Tut1" component={Tut1} />
        <HomeStack.Screen name="Tut2" component={Tut2} />
        <HomeStack.Screen name="Tut3" component={Tut3} />
        <HomeStack.Screen name="Tut4" component={Tut4} />
        <HomeStack.Screen name="Tut5" component={Tut5} />
        <HomeStack.Screen name="Tut6" component={Tut6} />
        <HomeStack.Screen name="Goals" component={GoalsScreen} />
        <HomeStack.Screen name="Let's Start" component={StartSaving} />
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Add Expense" component={AddExpenseTitle} />
        <HomeStack.Screen
          name="Choose Category"
          component={AddExpenseCategory}
        />
        <HomeStack.Screen name="Analytics" component={Analytics} />
        <HomeStack.Screen name="Logs" component={Logbook} />
        <HomeStack.Screen name="Profile" component={Profile} />
        <HomeStack.Screen
          name="Profile Settings"
          component={ProfileNameSetting}
        />
        <HomeStack.Screen name="Pin Settings" component={PinSetting} />
        <HomeStack.Screen
          name="Notification Settings"
          component={NotificationSetting}
        />
        <HomeStack.Screen name="Budget Settings" component={BudgetSetting} />
        <HomeStack.Screen name="Goal Settings" component={GoalSetting} />
      </HomeStack.Navigator>
    );
  } else {
    content = (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Add Expense" component={AddExpenseTitle} />
        <HomeStack.Screen
          name="Choose Category"
          component={AddExpenseCategory}
        />
        <HomeStack.Screen name="Analytics" component={Analytics} />
        <HomeStack.Screen name="Logs" component={Logbook} />
        <HomeStack.Screen name="Profile" component={Profile} />
        <HomeStack.Screen
          name="Profile Settings"
          component={ProfileNameSetting}
        />
        <HomeStack.Screen name="Pin Settings" component={PinSetting} />
        <HomeStack.Screen
          name="Notification Settings"
          component={NotificationSetting}
        />
        <HomeStack.Screen name="Budget Settings" component={BudgetSetting} />
        <HomeStack.Screen name="Goal Settings" component={GoalSetting} />
      </HomeStack.Navigator>
    );
  }

  return content;
};

export default HomeStackNavigator;
