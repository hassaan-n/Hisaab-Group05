import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import {Circle} from 'react-native-svg'
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import styles_HomeScreen from "../styles/styles.HomeScreen";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const HomeScreen = () => {
  const navigation = useNavigation();
  const username = "Hassan";
  const profilePicture = require("../images/hisaab.png");
  const tomorrowBudget = 200;
  const todayRemaining = 400;
  const percentageRemaining = 100-((1 / 4) * 100);
  const todayBudget: number = 500;

  const RemainderIndicator = ({ percentage }) => {
    let colorState: string = "#55C595";
    percentage = Math.round(percentage);

    if (percentage <= 30) {
      colorState = "#E3242B";
    } else if (percentage <= 80) {
      colorState = "#55C595";
    }

    let content = (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 18,
            color: colorState,
          }}
        >
          {" "}
          {percentage}%
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 12,
            color: "#215273",
            marginTop: -5,
          }}
        >
          Remaining
        </Text>
      </View>
    );

    return content;
  };


  const RemainderRing = ({ percentage }) => {
    let colorState: string = "#55C595";
    let colorState2: string = "#FFFFFF";
    

    if (percentage <= 30) {
      colorState = "#E3242B";
      colorState2 = "#F2B5AA";
    } else if (percentage <= 80) {
      colorState = "#55C595";
    }
    percentage = Math.round(100-percentage);

    let content = (
      <AnimatedCircularProgress
        style={{ position: "absolute" }}
        size={80}
        width={8}
        rotation={0}
        fill={percentage}
        tintColor={colorState}
        backgroundColor={colorState2}
        renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="4" fill={colorState} />}
      />
    );
    
    return content;
  };
  
  return (
    // mega container with all the elements
    <View style={styles.container}>
      <View style={styles_HomeScreen.welcomeContainer}>
        <View style={styles_HomeScreen.helloText}>
          <Text style={styles.text}>Hello</Text>
          <Text style={styles.heading}>{username}</Text>
        </View>

        <Pressable onPressIn={() => navigation.navigate("Profile")}>
          <View style={{ marginTop: 10 }}></View>
          <Image
            style={styles_HomeScreen.profilePicture}
            source={profilePicture}
          />
        </Pressable>
      </View>

      <ScrollView>
        <View style={styles_HomeScreen.card}>
          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Daily</Text>
          </View>

          <View style={styles_HomeScreen.dailyContainer}>
            <View style={styles_HomeScreen.dailyMiddleRow}>
              <View style={styles_HomeScreen.budgetNumberContainer}>
                <Text style={styles_HomeScreen.budgetNumber}>
                  {todayRemaining}
                </Text>
                <Text style={styles_HomeScreen.budgetText}>Remaining</Text>
              </View>

              <Pressable onPressIn={() => navigation.navigate("Transaction")}>
                <View style={styles_HomeScreen.addButton}>
                  <Image source={require("../images/Add.png")} />
                  <RemainderRing percentage={percentageRemaining} />
                </View>
               
              </Pressable>
             

              <View style={styles_HomeScreen.budgetNumberContainer}>
                <Text style={styles_HomeScreen.budgetNumber}>
                  {tomorrowBudget}
                </Text>
                <Text style={styles_HomeScreen.budgetText}>Tomorrow</Text>
              </View>
            </View>

            <RemainderIndicator percentage={percentageRemaining} />

           
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
