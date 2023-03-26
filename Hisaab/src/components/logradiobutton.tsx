import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import textStyles from "../styles";

const RadioButton = () => {
  const [selected, setSelected] = React.useState(0);

  return (
    
    <View style={styles.main}>

      <TouchableOpacity onPress={() => setSelected(1)}>

        <View style={styles.radioWrap}>
        <View style={[styles.radio, selected === 1 && { backgroundColor: '#55C595',borderColor: "white" }]}>
        <Text style={styles.radioText}>
          <Text style={[styles.subHeading, selected === 1 && {color: 'white'}]}>Food</Text>
        </Text>
        </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelected(2)}>
        <View style={styles.radioWrap}>
        <View style={[styles.radio, selected === 2 && { backgroundColor:  '#55C595',borderColor: "white" }]}>
        <Text style={styles.radioText}>
          <Text style={ [styles.subHeading, selected === 2 && {color: 'white'}]}>Subscriptions</Text>
        </Text>
        </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelected(3)}>
        <View style={styles.radioWrap}>
        <View style={[styles.radio, selected === 3 && { backgroundColor: '#55C595',borderColor: "white" }]}>
        <Text style={styles.radioText}>
          <Text style={[styles.subHeading, selected === 3 && {color: 'white'}]}>Laundry</Text>
        </Text>
        </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginLeft:100,
    marginTop:30,
    marginBottom:20,
    flexDirection: "row",
    justifyContent: "center",
  },
  radioText: {
    fontSize: 10,
    color: "black",
    marginLeft: 1 ,
  },
  subHeading: {
    fontSize: 12,
    color: "black",
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    paddingHorizontal: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,
    margin: 2,
    backgroundColor: "white",
  },
  radioWrap: {
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },

  radioBg: {
    height: 10,
    width: 10,
    borderRadius: 5,
    color:"green",
    backgroundColor: "green", 
    margin: 3.3,
  },

});

export default RadioButton;
