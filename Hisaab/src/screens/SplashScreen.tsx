import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import styles from "../styles";



//usetate for  sigunp boolean


const SplashScreen = () => {
  const navigation = useNavigation();
  const [debug, setDebug] = useState(true);
  const isFocused = useIsFocused();




  //function to move to home screen
  const MoveToHome = () => {

    
    let content = (<View></View>);

    useEffect(() => {
      if (isFocused) {
        navigation.navigate("Home");
      }
    }, [isFocused]);
   
    return content;
  };

  const Card = ({ showDebug }) => {
    let content;

    if (showDebug) {
      content = (
        <View>
        <Text style={styles.heading}>Hisaab</Text>
     <View style={{ height: 25 }}></View>
     <TouchableOpacity
         onPress={() => {navigation.navigate("Sign Up"); setDebug(false);}}
         style={styles.appButtonContainer}
       >
         <Text style={styles.appButtonText}>Signup</Text>
       </TouchableOpacity>
       <View style={{ height: 15 }}></View>

       <TouchableOpacity
         onPress={() => navigation.navigate("Home")}
         style={styles.appButtonContainer}
       >
         <Text style={styles.appButtonText}>Home</Text>
       </TouchableOpacity>
       <View style={{ height: 15 }}></View>

       <TouchableOpacity
         onPress={() => navigation.navigate("Summary")}
         style={styles.appButtonContainer}
       >
         <Text style={styles.appButtonText}>Splashscreen</Text>
       </TouchableOpacity>

     </View>
   
      );
    } else {
      content = <View>

        <MoveToHome />
      </View>;
    }

    return <View style={{ padding: 0 }}>{content}</View>;
  };





  
  return (
    // mega container with all the elements

    // const result = await launchImageLibrary(options?);

    <View style={styles.container}>
      <Card showDebug={debug} /> 







      
      

      
    
    </View>
    


     

      

    

    
  );
};

export default SplashScreen;
