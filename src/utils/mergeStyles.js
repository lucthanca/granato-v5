import lodash from "lodash";
import { StyleSheet } from "react-native";

export default (...rest) => {
  return StyleSheet.create(lodash.merge(...rest));
}
