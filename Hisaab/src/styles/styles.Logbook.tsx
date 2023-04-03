import {
    StyleSheet,
    View,
    Text,
    Pressable,
    FlatList,
    Button,
} from "react-native";

const styles_Logbook = StyleSheet.create({

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
        marginBottom: 25,

    },


    buttonContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },

    card_subheading: {
    
        // position: "absolute",
        fontSize: 13,
        fontFamily: "Poppins-Bold",
        // marginLeft:10,
        // paddingTop:33,
    
      },

      card_timestmap: {
    
        // position: "absolute",
        fontSize: 10,
        fontFamily: "Poppins ",
        // marginLeft:8,
        // paddingTop:50,
        
      },

    card: {

        marginBottom: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.01,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        height: 80,
        padding: 10,
        backgroundColor: '#F2F8F2',
        marginVertical: 10,
    },
    cardLeft: {
        justifyContent: 'center',
        
    },
    cardRight: {

    justifyContent: 'center',
        
    },

    cardText: {

        fontSize: 20,
        fontWeight: 'bold',
    },

    price: {
        // marginLeft: 240,
        // marginVertical: -30,
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        // fontWeight: 'bold',
    },
});

export default styles_Logbook;