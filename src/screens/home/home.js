import { Button, ScrollView, Text } from "react-native";
import React from 'react';
import Footer from "../../components/footer";
function HomeScreen({ navigation }) {
  return (
    <>
      <ScrollView contentContainerStyle={{alignItems: "center", justifyContent: "center",flex: 1}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate("Profile")}
        />
        <Button
          title="Go to Invite"
          onPress={() => navigation.navigate("Help")}
        />
      </ScrollView>
      <Footer />
    </>
  );
}

export default HomeScreen;
