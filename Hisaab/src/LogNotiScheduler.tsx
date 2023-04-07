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
  body: string,
  trigger: DailyTriggerInput
) => {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

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
