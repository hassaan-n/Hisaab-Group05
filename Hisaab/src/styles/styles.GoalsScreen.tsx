import {
    StyleSheet,
    View,
    Text,
    Pressable,
    FlatList,
    Button,
} from "react-native";

const styles_GoalsScreen = StyleSheet.create({

    budgetContainer: {
        marginBottom: 15,
    },

    inputContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    
    inputSingleContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 25,
    },


    buttonContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },
});

export default styles_GoalsScreen;