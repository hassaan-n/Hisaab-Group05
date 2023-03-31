import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import textStyles from "../styles";
type props = {
  onRadioButtonPress: (value: any) => void;
};

const RadioButton = ({ onRadioButtonPress }: props) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setSelected(1);
          onRadioButtonPress("Monthly");
        }}
      >
        <View style={styles.radioWrap}>
          <View style={styles.radio}>
            {selected === 1 ? <View style={styles.radioBg} /> : null}
          </View>
          <Text style={styles.radioText}>
            <Text style={textStyles.text}>Monthly</Text>
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelected(2);
          onRadioButtonPress("Weekly");
        }}
      >
        <View style={styles.radioWrap}>
          <View style={styles.radio}>
            {selected === 2 ? <View style={styles.radioBg} /> : null}
          </View>
          <Text style={styles.radioText}>
            <Text style={textStyles.text}>Weekly</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // main: {
  //   flex: 1,
  //   justifyContent: "center",
  // },
  radioText: {
    fontSize: 20,
    fontFamily: "Poppins",
  },

  radio: {
    height: 20,
    width: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
  },

  radioWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioBg: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
    margin: 3,
  },
});

export default RadioButton;
