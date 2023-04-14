import {
  Notification,
  scheduleNotificationAsync,
  cancelAllScheduledNotificationsAsync,
  cancelScheduledNotificationAsync,
  setNotificationHandler,
  DailyTriggerInput,
} from "expo-notifications";
import { storeItem, getKey } from "./MyAsyncStorage";

export const sendBreakfastNotification = async (
  title: string,
  body: string
) => {
  if (body.length < 37) {
    console.log("body length less than 37 in breakfast");
    return;
  }
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // console.log(notificationTime);
  //   notificationTime.setDate(notificationTime.getDate() + 1);
  //   notificationTime.setHours(4);
  //   notificationTime.setMinutes(51);
  //   notificationTime.setSeconds(0);
  //console.log(notificationTime);
  const trigger: DailyTriggerInput = {
    hour: 8,
    minute: 0,
    repeats: true,
  };
  try {
    await cancelScheduledNotificationAsync(await getKey("breakfast-noti"));
  } catch (e) {
    console.log(e);
  }

  console.log(trigger);
  const id = await scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: trigger,
  });
  await storeItem("breakfast-noti", id);
  console.log(id);
};

export const sendLunchNotification = async (title: string, body: string) => {
  if (body.length < 37) {
    console.log("body length less than 37 in lunch");
    return;
  }
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // console.log(notificationTime);
  //   notificationTime.setDate(notificationTime.getDate() + 1);
  //   notificationTime.setHours(4);
  //   notificationTime.setMinutes(51);
  //   notificationTime.setSeconds(0);
  //console.log(notificationTime);
  const trigger: DailyTriggerInput = {
    hour: 13,
    minute: 0,
    repeats: true,
  };
  try {
    await cancelScheduledNotificationAsync(await getKey("Lunch-noti"));
  } catch (e) {
    console.log(e);
  }

  console.log(trigger);
  const id = await scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: trigger,
  });
  await storeItem("Lunch-noti", id);
  console.log(id);
};

export const sendDinnerNotification = async (title: string, body: string) => {
  if (body.length < 37) {
    console.log("body length less than 37 in dinner");
    return;
  }

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // console.log(notificationTime);
  //   notificationTime.setDate(notificationTime.getDate() + 1);
  //   notificationTime.setHours(4);
  //   notificationTime.setMinutes(51);
  //   notificationTime.setSeconds(0);
  //console.log(notificationTime);
  const trigger: DailyTriggerInput = {
    hour: 19,
    minute: 0,
    repeats: true,
  };
  try {
    await cancelScheduledNotificationAsync(await getKey("Dinner-noti"));
  } catch (e) {
    console.log(e);
  }

  console.log(trigger);
  const id = await scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: trigger,
  });
  await storeItem("Dinner-noti", id);
  console.log(id);
};
