import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library you prefer

const BottomNavBar = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('UserProfile');

  const navigateTo = (screen) => {
    navigation.replace(screen);
    setSelectedTab(screen);
  };

  const renderTab = (screen, iconName) => {
    const isSelected = selectedTab === screen;

    return (
      <TouchableOpacity
        style={[styles.button, isSelected && styles.selectedButton]}
        onPress={() => navigateTo(screen)}
      >
        <Icon name={iconName} size={20} color={isSelected ? 'blue' : 'black'} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderTab('UserProfile', 'user')}
      {renderTab('Medications', 'medkit')}
      {renderTab('MedicationSearch', 'search')}
      {renderTab('CalendarPage', 'calendar')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee', // Optional: Set a background color for the navigation bar
    paddingVertical: 10,
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  button: {
    padding: 10,
  },
  selectedButton: {
    backgroundColor: '#ddd', // Change this color as per your design
  },
});

export default BottomNavBar;