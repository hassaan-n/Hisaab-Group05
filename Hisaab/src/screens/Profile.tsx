import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";


import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import styles_Profile from "../styles/styles.Profile";

const Profile = () => {
  const navigation = useNavigation();
  const username = "Hassan";
  const profilePicture = require("../images/hisaab.png");

  const profileIcon = require("../images/Profile.png");
  const pinIcon = require("../images/Pin.png");
  const notificationIcon = require("../images/Notification.png");
  const budgetIcon = require("../images/Budget.png");
  const goalIcon = require("../images/Goal.png");

  const ListItem = ({ title, image }) => (
    <View style={styles_Profile.listItem}>
      <Image source={image} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );

  const Divider = () => (
    <View
      style={{
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
        width: "100%",
      }}
    />
  );


  return (
    // mega container with all the elements
    <View style={styles.container}>
      <View style={styles_Profile.welcomeContainer}>
        <Pressable onPressIn={() => alert("Profile Picture")}>
          <View style={{ marginTop: 10 }}></View>
          <Image
            style={styles_Profile.profilePicture}
            source={profilePicture}
          />
        </Pressable> 

        <View style={styles_Profile.helloText}>
          <Text style={styles.text}>Hello</Text>
          <Text style={styles.heading}>{username}</Text>
        </View>

        <View style={styles_Profile.listCard}>

          <ListItem title="Profile" image={profileIcon} />
          <Divider />
          <ListItem title="Pin" image={pinIcon} />
          <Divider />
          <ListItem title="Notification" image={notificationIcon} />
          <Divider />
          <ListItem title="Budget" image={budgetIcon} />
          <Divider />
          <ListItem title="Goal" image={goalIcon} />

        </View>
      </View>
    </View>
  );
};

export default Profile;
