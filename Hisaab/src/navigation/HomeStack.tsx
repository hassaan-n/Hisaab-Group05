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
import Notifications from "../Notifications";
import SubCategory from "../screens/AddSubCategory";
import SplashScreen from "../screens/SplashScreen";
import AddExpenseSummary from "../screens/AddExpenseSummary";
import NotificationScheduler from "../Notifications";
import { View, Text, Button, Image, Pressable } from 'react-native';

import { TouchableOpacity } from "react-native-gesture-handler";

//need to implement in this file
//first needs to check if intiial sigup is done, if done then load the home screen direcrlt or show pin as per settings

const HomeStack = createNativeStackNavigator();


const HomeStackNavigator = (navigation) => {


  let content = null;
  content = (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Splash" component={SplashScreen} />
        <HomeStack.Screen name="Sign Up" component={SignUp} options={{headerBackVisible:false}} />
        <HomeStack.Screen name="Details" component={DetailsScreen} />
        <HomeStack.Screen name="Tut1" component={Tut1} options={{headerTitle:"Start Logging"}} />
        <HomeStack.Screen name="Tut2" component={Tut2} options={{headerTitle:"Select Title and Expense"}} />
        <HomeStack.Screen name="Tut3" component={Tut3} options={{headerTitle:"Seelct a Catgeory for your Expense"}} />
        <HomeStack.Screen name="Tut4" component={Tut4} options={{headerTitle:"Select a Subcategory"}} />
        <HomeStack.Screen name="Tut5" component={Tut5} options={{headerTitle:"Home Features Overview"}} />
        <HomeStack.Screen name="Tut6" component={Tut6} options={{headerTitle:"Budget and Goal Setup"}} />
        <HomeStack.Screen name="Goals" component={GoalsScreen} options={{headerTitle:"Initial Setup"}} />
        
        <HomeStack.Screen name="Sub Category" component={SubCategory} />
        <HomeStack.Screen name="Let's Start" component={StartSaving} />
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{ gestureEnabled: false, headerBackVisible: false, headerShown: false}}
        />
        <HomeStack.Screen name="Add Expense" component={AddExpenseTitle} />
        <HomeStack.Screen
          name="Choose Category"
          component={AddExpenseCategory}
        />
        <HomeStack.Screen name="Analytics" component={Analytics} />
        <HomeStack.Screen name="Logs" component={Logbook} />
        <HomeStack.Screen 
       
        name="Profile" 
        component={Profile} 
        // options={{
        //   gestureEnabled: false,
        //   headerLeft: () => (
        //     <Pressable
        //       onPressIn={() => {
        //         navigation.navigate("Splash");
        //       }}
        //     >
        //       <Image
        //         style={{ marginTop: 3 }}
        //         source={require("../images/Arrow.png")}
        //       />
        //     </Pressable>
        //   ),
        // }}


                
        />


        
     
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
        <HomeStack.Screen name="Summary" component={AddExpenseSummary} />
        <HomeStack.Screen name="Notifications" component={NotificationScheduler} />
      </HomeStack.Navigator>


  )
  return content;
        


};

export default HomeStackNavigator;
