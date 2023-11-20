import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Your scrollable content goes here */}
        {/* Add more views, components, or use a FlatList for a dynamic list */}
      </ScrollView>

      <View style={styles.bottomBar}>
        {renderTab('UserProfile', 'user')}
        {renderTab('Medications', 'medkit')}
        {renderTab('MedicationSearch', 'search')}
        {renderTab('CalendarPage', 'calendar')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 60, // Adjust this value based on the height of your bottom navigation bar
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee', // Optional: Set a background color for the navigation bar
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999, // Make sure the navigation bar stays above other content
  },
  button: {
    padding: 10,
  },
  selectedButton: {
    backgroundColor: '#ddd', // Change this color as per your design
  },
});

export default BottomNavBar;