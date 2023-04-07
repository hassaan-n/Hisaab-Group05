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
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const trigger: DailyTriggerInput = {
    hour: 7,
    minute: 30,
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
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

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
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const trigger: DailyTriggerInput = {
    hour: 18,
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


