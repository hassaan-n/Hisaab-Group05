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
import styles from "./styles";
import InputField from "./components/InputField";
import styles_SettingsBox from "./styles/styles.SettingsBox";

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
      // alert("Invalid time input!");
      return 0;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles_SettingsBox.card}>
        <View style={styles_SettingsBox.cardHeader}>
          <Text style={styles_SettingsBox.cardHeading}>Notification Time</Text>
        </View>

        <View style={styles_SettingsBox.cardInside}>
          <View style={{ marginBottom: 15 }}></View>
          <InputField
            title="Hour"
            placeholder={"Hour (0-23)"}
            onChangeText={setHour}
            value={hour}
            inputMode="numeric"
            maxLength={2}
          />

          <View style={{ marginBottom: 15 }}></View>

          <InputField
            title="Minute"
            placeholder={"Minute (0-59)"}
            onChangeText={setMinute}
            value={minute}
            inputMode="numeric"
            maxLength={2}
          />

          <View style={{ marginBottom: 25 }}></View>

          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => {

                if (hour == "" || minute == "") {
                  alert("Please enter a valid time");
                 
                }
                else if (parseInt(hour) < 0 || parseInt(hour) > 23) {
                  alert("Please enter a valid hour");
                
                }
                else if (parseInt(minute) < 0 || parseInt(minute) > 59) {
                  alert("Please enter a valid minute");
                  
                }
                else {
                  handleScheduleNotification();
                  navigation.navigate("Splash");
                }

              }}

              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 10 }}></View>

          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.appButtonContainerAlt}
            >
              <Text style={styles.appButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
{/* 
      <Button
        title="Schedule Notification"
        onPress={handleScheduleNotification}
      /> */}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          // onPress={() => {navigation.navigate("Tut1"); addUser(text,toggle,number); getAllUsers();}}

          onPress={() => {
            navigation.navigate("Splash");
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
