import {
  Notification,
  scheduleNotificationAsync,
  cancelAllScheduledNotificationsAsync,
  cancelScheduledNotificationAsync,
  setNotificationHandler,
  DailyTriggerInput,
} from "expo-notifications";
import { storeItem, getKey } from "./MyAsyncStorage";

const sendNotification = async (
  title: string,
  body: string
  //trigger: DailyTriggerInput
) => {
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
      hour: 12,
      minute: 51,
      repeats: true,
    };
  try {
    await cancelScheduledNotificationAsync(await getKey("log-noti"));
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
  await storeItem("log-noti", id);
  console.log(id);
};

export default sendNotification;
