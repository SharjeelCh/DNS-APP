import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './Pages/Navigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  StatusBar.setBarStyle('light-content', true);
  StatusBar.setHidden(false);
  StatusBar.setBackgroundColor('black');
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
