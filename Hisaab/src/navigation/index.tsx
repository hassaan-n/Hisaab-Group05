import React, { useEffect } from "react";
import { Platform } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import HomeStackNavigator from "./HomeStack";

// export const BACKGROUND_FETCH_TASK = "budget-notification-task";
// async function task() {
//   console.log("defining task");
//   TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//     let budget = 0;
//     console.log("carrying out task");
//     db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT current_state FROM budget;",
//         [],
//         (_, { rows }) => {
//           budget = rows._array[rows.length - 1]["current_state"];
//         },
//         (_, error) => {
//           console.log(error);
//         }
//       );
//     });
//     console.log("budget", budget);

//     // Create a local notification
//     const notificationContent = {
//       title: "Current Budget",
//       body: `Your budget is ${budget}`,
//       data: { budget },
//     };
//     await scheduleNotificationAsync({
//       content: notificationContent,
//       trigger: {
//         seconds: 5, //triggerTime   // enter time here in seconds calculate the difference between current time and user input time
//       },
//     });
//     console.log("triggerTime");

//     return BackgroundFetch.setMinimumIntervalAsync(10); // enter time should be in seconds I think it should be 24 hours as this event must be scheduled once every 24 hours
//   });
// }

//define the task

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 255, 255)",
    background: "rgb(242, 242, 242)",
    card: "rgb(0, 0, 0)",
    text: "rgb(255, 255, 255)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};
const RootNavigator = () => {
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
