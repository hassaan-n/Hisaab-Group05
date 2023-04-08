import * as TaskManager from "expo-task-manager";
import db from "./database";
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";
import * as Device from "expo-device";
import { Platform } from "react-native";

const BACKGROUND_FETCH_TASK = "budget-notification-task";

//define the task
console.log("defining task");
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log("carrying out task");
  let budget = 0;
  await new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT current_state FROM budget;",
        [],
        (_, { rows }) => {
          budget = rows._array[rows.length - 1].current_state;
          console.log(rows._array);
          resolve();
        },
        (_, error) => {
          console.log(error);
          reject();
        }
      );
    });
  });
  console.log("budget", budget);

  // Create a local notification
  const notificationContent = {
    title: "Current Budget",
    body: `Your budget is ${budget} Rs`,
    data: { budget },
  };
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  await Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: null, //{
    //seconds: 10, //triggerTime   // enter time here in seconds calculate the difference between current time and user input time
    //repeats: true, // set the repeat frequency to be in minute
    // set the repeat frequency to be in minute
    //},
  });
  console.log("noti schduled");
  //repeating notifications after every 1 minute
  return BackgroundFetch.setMinimumIntervalAsync(20); //.setMinimumIntervalAsync(5); // enter time should be in seconds I think it should be 24 hours as this event must be scheduled once every 24 hours
});
export default BACKGROUND_FETCH_TASK;
