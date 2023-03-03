import { Button, ScrollView, Text } from 'react-native';
import React from 'react';
import Footer from '../../components/footer';
function HomeScreen({ navigation }) {
  return (
    <>
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Home Screen</Text>
        <Button title="Go to Product Page" onPress={() => navigation.navigate('ProductFullDetail')} />
      </ScrollView>
      <Footer />
    </>
  );
}

export default HomeScreen;
