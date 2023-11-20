import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const BottomNavBar = () => {

  const [activePage, setActivePage] = useState('UserProfile');

  const navigation = useNavigation();

  const navigateToUserProfile = () => {
    setActivePage('UserProfile');
    navigation.replace('UserProfile');
  };

  const navigateToMedications = () => {
    setActivePage('Medications');
    navigation.replace('Medications');
  };

  const navigateToMedicineSearch = () => {
    setActivePage('MedicationSearch');
    navigation.replace('MedicationSearch');
  };

  const navigateToMedCalendar = () => {
    setActivePage('CalendarPage');
    navigation.replace('CalendarPage');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={activePage === 'UserProfile' ? [styles.button, styles.activeButton] : styles.button}
        onPress={navigateToUserProfile}
      >
        <Icon name="person-outline" size={30} color="#aaa" />
        <Text style={styles.buttonText}>User Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={activePage === 'Medications' ? [styles.button, styles.activeButton] : styles.button}
        onPress={navigateToMedications}
      >
        <Icon name="medkit-outline" size={30} color="#aaa" />
        <Text style={styles.buttonText}>Medications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={activePage === 'MedicineSearch' ? [styles.button, styles.activeButton] : styles.button}
        onPress={navigateToMedicineSearch}
      >
        <Icon name="search-outline" size={30} color="#aaa" />
        <Text style={styles.buttonText}>Medicine Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={activePage === 'MedCalendar' ? [styles.button, styles.activeButton] : styles.button}
        onPress={navigateToMedCalendar}
      >
        <Icon name="calendar-outline" size={30} color="#00f" />
        <Text style={styles.buttonText}>Med Calendar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007BFF', // Highlight color
    borderRadius: 5,
  },
  buttonText: {
    marginTop: 5,
    color: '#aaa',
  },
});

export default BottomNavBar;