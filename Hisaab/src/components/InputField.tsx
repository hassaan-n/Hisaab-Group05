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


import styles from "../styles";



const InputField = ({ title, placeholder,onChangeText, value, inputMode,maxLength }) => {
    return (
      <View style={styles.inputSingleContainer}>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        keyboardType={inputMode}
        maxLength={maxLength}
      />
    </View>
    );
  }

  export default InputField;