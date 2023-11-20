import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Medications = () => {
  const [medications, setMedications] = useState([]);

  const getStoredMedications = async () => {
    try {
      // Retrieve medications from AsyncStorage
      const storedMedications = await AsyncStorage.getItem('medications');
  
      // Parse the JSON data, or set an empty array if no data is found
      return storedMedications ? JSON.parse(storedMedications) : [];
    } catch (error) {
      console.error('Error retrieving medications:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMedications = async () => {
      const storedMedications = await getStoredMedications();
      setMedications(storedMedications);
    };

    fetchMedications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Medications</Text>
      {medications.length === 0 ? (
        <Text>No medications added yet.</Text>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.medicationItem}>
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text>Dosage: {item.dosage}</Text>
              <Text>Frequency: {item.frequency}</Text>
              {/* <Text>Start Date: {new Date(item.startDate).toDateString()}</Text>
              <Text>End Date: {new Date(item.endDate).toDateString()}</Text> */}
            </View>
          )}
        />
      )}
      <View>
        <BottomTabNavigator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicationItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Medications;