import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import styles_HomeScreen from "../styles/styles.HomeScreen";

const HomeScreen = () => {
  const navigation = useNavigation();
  const username = "John Doe";

  return (
    // mega container with all the elements
    <View style={styles.container}>
      <View style={styles_HomeScreen.welcomeContainer}>
        <View style={styles_HomeScreen.helloText}>
          <Text style={styles.text}>Hello</Text>
          <Text style={styles.heading}>{username}</Text>
        </View>
        <View style ={styles_HomeScreen.profilePicture}>
            <Image source={require("../images/profile.png")} />
        </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
