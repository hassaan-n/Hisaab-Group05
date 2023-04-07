import {
  Notification,
  scheduleNotificationAsync,
  cancelAllScheduledNotificationsAsync,
  setNotificationHandler,
  DailyTriggerInput,
} from "expo-notifications";
import { useState, useEffect } from "react";
import db from "./database";
import { storeItem, getKey } from "./MyAsyncStorage";
import { View, Button, TouchableOpacity, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import sendNotification from "./LogNotiScheduler";

const NotificationScheduler = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const handleScheduleNotification = () => {
    const notificationTitle = title || "Notification Title";
    const notificationBody = body || "Notification Body";
    const notificationHour = parseInt(hour) || 0;
    const notificationMinute = parseInt(minute) || 0;

    if (
      notificationHour >= 0 &&
      notificationHour <= 23 &&
      notificationMinute >= 0 &&
      notificationMinute <= 59
    ) {
      const trigger: DailyTriggerInput = {
        hour: notificationHour,
        minute: notificationMinute,
        repeats: true,
      };
      sendNotification(notificationTitle, notificationBody, trigger);
      alert(
        `Notification scheduled for ${notificationHour}:${notificationMinute}`
      );
    } else {
      alert("Invalid time input!");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", marginTop: 50 }}>
      <Text>Title:</Text>
      <TextInput onChangeText={setTitle} value={title} />

      <Text>Body:</Text>
      <TextInput onChangeText={setBody} value={body} />

      <Text>Notification Time:</Text>
      <TextInput
        onChangeText={setHour}
        value={hour}
        keyboardType="numeric"
        placeholder="Hour (0-23)"
      />
      <TextInput
        onChangeText={setMinute}
        value={minute}
        keyboardType="numeric"
        placeholder="Minute (0-59)"
      />

      <Button
        title="Schedule Notification"
        onPress={handleScheduleNotification}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
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

export default NotificationScheduler;

//export default SetBudgetNotification;
