import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import textStyles from "../styles";

type props = {
  onRadioButtonPress: (value: any) => void;
};

const RadioButton = ({ onRadioButtonPress }: props) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={() => {
          setSelected((prev) => (prev === 1 ? 0 : 1));
          onRadioButtonPress((prev) => (prev === "Food" ? "" : "Food"));
        }}
      >
        <View style={styles.radioWrap}>
          <View
            style={[
              styles.radio,
              selected === 1 && {
                backgroundColor: "#55C595",
                borderColor: "white",
              },
            ]}
          >
            <Text style={styles.radioText}>
              <Text
                style={[
                  styles.subHeading,
                  selected === 1 && { color: "white" },
                ]}
              >
                Food
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelected((prev) => (prev === 2 ? 0 : 2));
          onRadioButtonPress((prev) =>
            prev === "Subscriptions" ? "" : "Subscriptions"
          );
        }}
      >
        <View style={styles.radioWrap}>
          <View
            style={[
              styles.radio,
              selected === 2 && {
                backgroundColor: "#55C595",
                borderColor: "white",
              },
            ]}
          >
            <Text style={styles.radioText}>
              <Text
                style={[
                  styles.subHeading,
                  selected === 2 && { color: "white" },
                ]}
              >
                Subscriptions
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelected((prev) => (prev === 3 ? 0 : 3));
          onRadioButtonPress((prev) => (prev === "Laundry" ? "" : "Laundry"));
        }}
      >
        <View style={styles.radioWrap}>
          <View
            style={[
              styles.radio,
              selected === 3 && {
                backgroundColor: "#55C595",
                borderColor: "white",
              },
            ]}
          >
            <Text style={styles.radioText}>
              <Text
                style={[
                  styles.subHeading,
                  selected === 3 && { color: "white" },
                ]}
              >
                Laundry
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelected((prev) => (prev === 4 ? 0 : 4));
          onRadioButtonPress((prev) =>
            prev === "Transport" ? "" : "Transport"
          );
        }}
      >
        <View style={styles.radioWrap}>
          <View
            style={[
              styles.radio,
              selected === 4 && {
                backgroundColor: "#55C595",
                borderColor: "white",
              },
            ]}
          >
            <Text style={styles.radioText}>
              <Text
                style={[
                  styles.subHeading,
                  selected === 4 && { color: "white" },
                ]}
              >
                Transport
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelected((prev) => (prev === 5 ? 0 : 5));
          onRadioButtonPress((prev) => (prev === "Grocery" ? "" : "Grocery"));
        }}
      >
        <View style={styles.radioWrap}>
          <View
            style={[
              styles.radio,
              selected === 5 && {
                backgroundColor: "#55C595",
                borderColor: "white",
              },
            ]}
          >
            <Text style={styles.radioText}>
              <Text
                style={[
                  styles.subHeading,
                  selected === 5 && { color: "white" },
                ]}
              >
                Grocery
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelected((prev) => (prev === 6 ? 0 : 6));
          onRadioButtonPress((prev) => (prev === "Other" ? "" : "Other"));
        }}
      >
        <View style={styles.radioWrap}>
          <View
            style={[
              styles.radio,
              selected === 6 && {
                backgroundColor: "#55C595",
                borderColor: "white",
              },
            ]}
          >
            <Text style={styles.radioText}>
              <Text
                style={[
                  styles.subHeading,
                  selected === 6 && { color: "white" },
                ]}
              >
                Other
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelected((prev) => (prev === 7 ? 0 : 7));
          onRadioButtonPress((prev) =>
            prev === "Education" ? "" : "Education"
          );
        }}
      >
        <View style={styles.radioWrap}>
          <View
            style={[
              styles.radio,
              selected === 7 && {
                backgroundColor: "#55C595",
                borderColor: "white",
              },
            ]}
          >
            <Text style={styles.radioText}>
              <Text
                style={[
                  styles.subHeading,
                  selected === 7 && { color: "white" },
                ]}
              >
                Education
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginLeft: 50,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  radioText: {
    fontSize: 10,
    color: "black",
    marginLeft: 1,
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
    color: "green",
    backgroundColor: "green",
    margin: 3.3,
  },
});

export default RadioButton;
