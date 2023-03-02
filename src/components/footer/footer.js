import React from "react";
import { Text, View } from "react-native";
import { TabHome, TabCategory, TabAccount, TabCart } from "./tabs";

import Constants from "../../constants";

const Footer = props => {

  const styles = {
    root: {
      maxHeight: 64,
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      // borderWidth: 1,
      // borderColor: "blue",
      backgroundColor: '#fff',
      ...Constants.boxShadow.md,
      borderTopLeftRadius: Constants.alignSize[4],
      borderTopRightRadius: Constants.alignSize[4],
    },
  };

  return (
    <View style={styles.root}>
      <TabHome />
      <TabCategory />
      <TabAccount />
      <TabCart />
    </View>
  );
};

export default Footer;
