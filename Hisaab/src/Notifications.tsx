import { Notification, scheduleNotificationAsync } from "expo-notifications";
import { useState, useEffect } from "react";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import db from "./database";
import { storeItem, getKey } from "./AsyncStorage";
import { View, Button, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BACKGROUND_FETCH_TASK from "./task";
// import { BACKGROUND_FETCH_TASK } from "./navigation/index";
//name the task
// const BACKGROUND_FETCH_TASK = "budget-notification-task";

// //define the task
// TaskManager.defineTask(
//   BACKGROUND_FETCH_TASK,
//   async ({ data: { triggerTime } }: any) => {
//     let budget = 0;
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
//   }
// );
async function registerBackgroundFetchAsync() {
  console.log("registering background fetch");
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 2, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

// async function registerBackgroundFetchAsync() {
//   console.log("registering background fetch");
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   });
// }

// async function unregisterBackgroundFetchAsync() {
//   return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
// }

export const SetBudgetNotification = () => {
  //   const  [budgetNotification, setBudgetNotification ] = useState(false);
  //     try{
  //         await getKey("budgetNotification").then((value) => {
  //             setBudgetNotification(value);
  //         });
  //     }catch(e){
  //         storeItem("budgetNotification", true);
  //         setBudgetNotification(true);
  //     }
  // };
  const navigation = useNavigation();
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };
  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
      console.log("registered");
    }

    checkStatusAsync();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", marginTop: 50 }}>
      {isRegistered ? (
        <Button title="Stop Background Task" onPress={toggleFetchTask} />
      ) : (
        <Button title="Start Background Task" onPress={toggleFetchTask} />
      )}

      <View>
        <TouchableOpacity
          // onPress={() => {navigation.navigate("Tut1"); addUser(text,toggle,number); getAllUsers();}}

          onPress={() => {
            navigation.navigate("Let's Start");
            // const currentTime = new Date().toLocaleString();
            // console.log(typeof currentTime);
            // console.log(currentTime);
          }}
        >
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetBudgetNotification;
// export const sendNotification = async (title: string, body: string) => {
//   scheduleNotificationAsync({
//     content: {
//       title: title,
//       body: body,
//     },
//     trigger: {
//       seconds: 5,

//     },
//   });
//   console.log("Notification sent");
// };
