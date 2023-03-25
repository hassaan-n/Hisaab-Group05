import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles_progressBar from "../styles/styles.progressBar";


const ProgressBar = ({ value, goal }) => {
  const progress = (value / goal) * 100;

  return (
    <View>
    <View style={styles_progressBar.container}>
      <View style={[styles_progressBar.bar, { width: `${progress}%` }]} />
      <Text style={styles_progressBar.text}>{`${value}/${goal}`}</Text>
    </View>
    </View>
  );
};
  

export default ProgressBar;
