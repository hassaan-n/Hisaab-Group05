import { StyleSheet, View, Text, Pressable, FlatList,Button } from 'react-native';


const styles_HomeScreen = StyleSheet.create({


    helloText: {
        marginBottom: 10,
    },

    welcomeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 15,
    },

    profilePicture: {  
      resizeMode: "contain",
      width: 50,
      height: 50,
      borderRadius: 50,

    },

    card: {
        zIndex: 2,
        backgroundColor: "#F2F8F2",
        borderRadius: 10,
        width: "100%",
        height: "auto",
        
    },
    cardHeader: {
      zIndex: 1,
      width: "100%",
      height: 40,
      justifyContent: "center",
      paddingLeft: 10,
      backgroundColor: "#55C595",
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
    },

    cardHeading: {
        fontSize: 16,
        fontFamily: "Poppins-Bold",
        color: "#FFFFFF",
    },

    addButton: {
        zIndex: 2,
        width: 65,
        height: 65,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#55C595",
    },

    budgetNumberContainer: {
      height: 60,
      width: 65,
      paddingTop: 0,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    budgetNumber: {
      fontFamily: "Poppins-Bold",
      fontSize: 24,
      color: "#215273",
    },

    budgetText: {
      fontFamily: "Poppins",
      fontSize: 14,
      marginTop: -5,
      color: "#215273",
    },


    dailyContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 10,
    },

    dailyMiddleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        width: "90%",
        paddingTop: 10,
        paddingBottom: 20,
    },



    



  });





export default styles_HomeScreen;

