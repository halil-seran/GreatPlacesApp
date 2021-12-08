import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';

export default function App() {
  return (
      <PlacesNavigator />   
  );
}
// <StatusBar style='light' hidden={true}  />
const styles = StyleSheet.create({
  
});
