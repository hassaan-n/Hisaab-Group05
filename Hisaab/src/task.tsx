import * as TaskManager from "expo-task-manager";
import db from "./database";
import {
  Notification,
  scheduleNotificationAsync,
  setNotificationHandler,
} from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";

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
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  await scheduleNotificationAsync({
    content: notificationContent,
    trigger: {
      seconds: 5, //triggerTime   // enter time here in seconds calculate the difference between current time and user input time
    },
  });
  console.log("noti schduled");
  //repeating notifications after every 1 minute
  return BackgroundFetch.setMinimumIntervalAsync(60); //.setMinimumIntervalAsync(5); // enter time should be in seconds I think it should be 24 hours as this event must be scheduled once every 24 hours
});
export default BACKGROUND_FETCH_TASK;
