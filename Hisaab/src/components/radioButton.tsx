import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import textStyles from "../styles";
// type props = {
//   time: string;
// };

const RadioButton = () => {
    const [selected, setSelected] = React.useState(0);

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => setSelected(1)}>
                <View style={styles.radioWrap}>
                    <View style={styles.radio}>
                        {selected === 1 ? <View style={styles.radioBg} /> : null}
                    </View>
                    <Text style={styles.radioText}>
                        <Text style={textStyles.subHeading}>Monthly</Text>
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelected(2)}>
                <View style={styles.radioWrap}>
                    <View style={styles.radio}>
                        {selected === 2 ? <View style={styles.radioBg} /> : null}
                    </View>
                    <Text style={styles.radioText}>
                        <Text style={textStyles.subHeading}>Weekly</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
    },
    radioText: { fontSize: 20 },

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
        margin: 3.3,
    },
});

export default RadioButton;