import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeItem = async (key: any, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    const jsonKey = JSON.stringify(key);
    await AsyncStorage.setItem(jsonKey, jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getKey = async (key: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(JSON.stringify(key));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
