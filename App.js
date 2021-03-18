import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home';
import LatestAnime from './src/components/LatestRelease';
import MostPopular from './src/components/MostPopular';
import AnimeDetails from './src/components/AnimeDetails';

const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaView style= {styles.container}>

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name= "Latest Release" component= {LatestAnime} />
          <Stack.Screen name= "Most Popular" component= {MostPopular} />
          <Stack.Screen name="Details Anime" component={AnimeDetails}/>
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80bfff',
    marginTop: Platform.iOS ? 0 : 20,
  },

});
