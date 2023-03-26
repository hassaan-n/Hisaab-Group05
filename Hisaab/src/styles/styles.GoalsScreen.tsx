import {
    StyleSheet,
    View,
    Text,
    Pressable,
    FlatList,
    Button,
} from "react-native";

const styles_GoalsScreen = StyleSheet.create({
   
    imageContainer: {
        width: 500,
        height: 600,
        paddingTop: 10,
        paddingBottom: 50,
    },

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

        paddingBottom: 20,
    },

    buttonContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },

    card: {
       
        marginBottom:1,
        borderWidth: 0.01,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        height:70,
        padding: 10,
        backgroundColor: '#F2F8F2',
        marginVertical: 10,
      },

      cardText: {
        
        fontSize: 20,
        fontWeight: 'bold',
      },

      price: {
        marginLeft:250,
        marginVertical:-30,
        fontSize: 20,
        fontWeight: 'bold',
      },
});

export default styles_GoalsScreen;