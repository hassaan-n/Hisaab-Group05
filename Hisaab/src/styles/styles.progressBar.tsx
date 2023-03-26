import { StyleSheet, View, Text, Pressable, FlatList,Button } from 'react-native';


const styles_SignUp = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#CFF4D2',
        borderRadius: 10,
        overflow: 'hidden',
        flex: 1
      },
      bar: {
        height: '100%',
        backgroundColor: '#55c595',
      },
      text: {
        position: 'absolute',
        right: 10,
        color: '#555',
        fontWeight: 'bold',
        flex: 0
      },
      days: {
        // position: 'absolute',
        // right: 10,
        color: '#555',
        fontWeight: 'bold',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
  });





export default styles_SignUp;

