import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles_GoalsScreen from "../styles/styles.GoalsScreen";
import styles from '../styles';
import RadioButton from "../components/radioButton";
import db from "../database"
import styles_HomeScreen from "../styles/styles.HomeScreen";
import styles_analytics from "../styles/styles.analytics";


import SpendingChart from './spending';
import ProgressBar from "./progressbar";
import MyChart from "./piechart";
 


const Analytics = () => {

  const [totalGoal, setTotalGoal] = useState(0);

  const getGoal = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT amount FROM goal ORDER BY id DESC LIMIT 1;",
        [],
        (_, { rows }) => {
          if (rows._array.length > 0) {
            setTotalGoal(rows._array[0].amount);
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };


  const [sum, setsum] = useState(0);

  const getsum = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT SUM(amount) as totalAmount FROM savings;",
        [],
        (_, { rows }) => {
          if (rows._array.length > 0) {
            setsum(rows._array[0].totalAmount);
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  useEffect(() => {
    getsum();
  }, []);

  useEffect(() => {
    getGoal();
  }, []);

  return (
    // mega container with all the elements
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles_analytics.analytics}>
          <Text style={styles.text}>Review your spending patterns</Text>
          <Text style={styles.heading}>Analytics</Text>
        </View>

        <View style={styles_HomeScreen.card}>
          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Spending Report</Text>
          </View>
          <View style={styles_analytics.analytics}>
            <Text style = {{position: "absolute",left:4 ,top: 100, zIndex: 2, fontSize:13, transform: [{ rotate: '270deg' }]}}>PKR</Text>
            < SpendingChart />
          </View>
          <View style={styles_HomeScreen.centerText}>
            <Text>
              Days
            </Text>
          </View>
        </View>
        <View style={styles_HomeScreen.card}>

          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Progress to Goal</Text>
          </View>
          <View style={styles_HomeScreen.progressBar}>
            < ProgressBar value={sum} goal={totalGoal} />
          </View>
          <View style={styles_HomeScreen.centerText}>
            
          </View>
        </View>

        <View style={styles_HomeScreen.card}>

          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Category Wise Spending</Text>
          </View>
          <View style={styles_HomeScreen.chart}>
            < MyChart />
          </View>
        </View>
      </View>


    </ScrollView>
  );
};

export default Analytics;
