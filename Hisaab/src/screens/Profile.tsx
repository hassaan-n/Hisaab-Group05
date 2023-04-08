import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderBackButton } from 'react-navigation';

//import app name and version from package.json
import { name, version } from "../../package.json";

import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import styles_Profile from "../styles/styles.Profile";
import InputField from "../components/InputField";

import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const navigation = useNavigation();
  const username = "Hassan";
  const profilePicture = require("../images/hisaab.png");
  const [ProfileModalVisible, setProfileModalVisible] = React.useState(false);

  const [text, onChangeText] = React.useState("");

  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    // Retrieve the image URI from AsyncStorage when the component mounts
    const getImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("@profileImage");
        if (storedImage !== null) {
          setImage(storedImage);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImage();
  }, []);

  const storeImage = async (imageUri: any) => {
    try {
      // Store the image URI in AsyncStorage
      await AsyncStorage.setItem("@profileImage", imageUri);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.uri);
      storeImage(result.uri);
    }
  };
  const navigationOptions = ({navigation}) => {
    return{
      headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('A')}}/>)
   }
  }
  

  const profileIcon = require("../images/Profile.png");
  const pinIcon = require("../images/Pin.png");
  const notificationIcon = require("../images/Notification.png");
  const budgetIcon = require("../images/Budget.png");
  const goalIcon = require("../images/Goal.png");

  const ListItem = ({ title, image, navigateTo }) => (
    <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles_Profile.listItem}>
        <Image source={image} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
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

    // const result = await launchImageLibrary(options?);
    <View style={styles.container}>
      <View style={styles_Profile.welcomeContainer}>
        <View style={styles_Profile.profilePictureSection}>
          <Image
            source={profilePicture}
            style={styles_Profile.profilePictureDefault}
          />

          <Pressable
            style={styles_Profile.profilePicture}
            onPressIn={pickImage}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={styles_Profile.profilePicture}
              />
            )}
          </Pressable>
        </View>

        <View style={styles_Profile.helloText}>
          <Text style={styles.heading}> Profile settings</Text>
        </View>
      </View>
      <View style={styles_Profile.listCard}>
        <ListItem
          title="Profile Name"
          image={profileIcon}
          navigateTo="Profile Settings"
        />
        <Divider />
        <ListItem title="Pin" image={pinIcon} navigateTo="Pin Settings" />
        <Divider />
        <ListItem
          title="Notification"
          image={notificationIcon}
          navigateTo="Notification Settings"
        />
        <Divider />
        <ListItem
          title="Budget"
          image={budgetIcon}
          navigateTo="Budget Settings"
        />
        <Divider />
        <ListItem title="Goal" image={goalIcon} navigateTo="Goal Settings" />
      </View>
      <View style={styles_Profile.bottomVer}>
        <Text style={styles.subHeading}>{name}</Text>
        <Text style={styles.text}>V {version}</Text>
      </View>
    </View>
  );
};

export default Profile;
