import React, { useState } from "react";
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

import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import styles_Profile from "../styles/styles.Profile";
import InputField from "../components/InputField";
import styles_SettingsBox from "../styles/styles.SettingsBox";
import db from "../database";
import { RotateInDownLeft } from "react-native-reanimated";

const ProfileNameSetting = () => {
  const navigation = useNavigation();
 
  const [NewName, onChangeText] = React.useState("");
//get current name of user id 1 from db and return as string
  const GetCurrentName = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT name FROM user WHERE id = 0",
            [],
            (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    var row = results.rows.item(0);
                    return row.name;
                }
            }
        );
    });
    };

  const UpdateNameInDB = () => {
    db.transaction((tx) => { tx.executeSql("UPDATE user SET name = ? WHERE id = 1", [NewName]); });
   
  };


  return (
    // mega container with all the elements
    <View style={styles.container}>
        <View style={styles_SettingsBox.card}>
          <View style={styles_SettingsBox.cardHeader}>
            <Text style={styles_SettingsBox.cardHeading}>Profile</Text>
          </View>

          <View style={styles_SettingsBox.cardInside}>
            <View style={{ marginBottom: 15 }}></View>
            <InputField
              title="Name"
              placeholder={GetCurrentName()}
              onChangeText={onChangeText}
              value={NewName}
              inputMode=""
            />
            <View style={{ marginBottom: 25 }}></View>

            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => {UpdateNameInDB(); navigation.goBack()}}
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
      
      
      
      
      
    
    </View>
  );
};

export default ProfileNameSetting;
