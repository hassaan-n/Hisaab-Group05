import { Notification, scheduleNotificationAsync } from "expo-notifications";
import { Platform } from "react-native";

export const sendNotification = async (title: string, body: string) => {
  scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      seconds: 5,
    },
  });
  console.log("Notification sent");
};
