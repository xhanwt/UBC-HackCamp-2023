// ScreenWrapper.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';

const ScreenWrapper = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <BottomTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align content at the bottom
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;