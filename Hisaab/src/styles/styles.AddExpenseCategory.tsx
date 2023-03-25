import {
    StyleSheet,
    View,
    Text,
    Pressable,
    FlatList,
    Button,
} from "react-native";

const styles_AddExpenseCategory = StyleSheet.create({

 
    title: {
        flexDirection: "column",
        justifyContent: "space-between",
    },

    listContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 10,
        width: "100%",
        height: 100,
        borderColor: "#dddddd",
        borderWidth: 1,
        marginTop: 20,
    }
    ,
    


    buttonContainer: {
        position: "absolute",
        top: 175,
        width: "100%",
        paddingTop: 20,
        paddingBottom: 20,
    },
});

export default styles_AddExpenseCategory;