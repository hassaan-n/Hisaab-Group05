import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import styles from "../styles";


const RadioButton = () => {
    const [selected, setSelected] = React.useState(0);

    return (
        <View>
            <TouchableOpacity onPress={() => setSelected(1)}>
                <View style={stylesRadioButton.radioWrap}>
                    <View style={stylesRadioButton.radio}>
                        {selected === 1 ? <View style={stylesRadioButton.radioBg} /> : null}
                    </View>
                    <Text style={stylesRadioButton.radioText}>
                        <Text style={styles.text}>Monthly</Text>
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelected(2)}>
                <View style={stylesRadioButton.radioWrap}>
                    <View style={stylesRadioButton.radio}>
                        {selected === 2 ? <View style={stylesRadioButton.radioBg} /> : null}
                    </View>
                    <Text style={stylesRadioButton.radioText}>
                        <Text style={styles.text}>Weekly</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const stylesRadioButton = StyleSheet.create({

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