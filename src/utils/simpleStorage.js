import AsyncStorage from '@react-native-async-storage/async-storage';

class AppStorage {
  static setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // console.log('Error saving data');
    }
  };

  static getData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      // console.log('Error retrieving data');
    }
  };

  static removeData = async keys => {
    keys.forEach(async item => {
      await AsyncStorage.removeItem(item);
    });
  };

  static removeItem = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };
}

export default AppStorage;
