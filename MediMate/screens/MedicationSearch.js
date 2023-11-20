import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import ScreenWrapper from './ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './BottomTabNavigator';
import { useNavigation } from '@react-navigation/native';


// Get user email from AsyncStorage

const getUserEmail = async () => {
  try {
    const userEmail = await AsyncStorage.getItem('userEmail');
    return userEmail;
  } catch (error) {
    console.error('Error retrieving user email:', error);
  }
};

const MedicationSearch = () => {
  const [medicationName, setMedicationName] = useState('');
  const [medicationData, setMedicationData] = useState(null);

  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [addButtonVisible, setAddButtonVisible] = useState(true);
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleAddMedication = () => {
    if(medicationName !== '') {
      setIsAddingMedication(true);
      setAddButtonVisible(false);
    } 
  };

  const handleSaveMedication = async () => {
    try {
      // Get user email from AsyncStorage
      const userEmail = await AsyncStorage.getItem('userEmail');
  
      // Retrieve existing medications from AsyncStorage or set an empty array
      const existingMedications = JSON.parse(await AsyncStorage.getItem('medications')) || [];
  
      // Create a new medication object with dosage and frequency
      const newMedication = {
        name: medicationData.genericUse,
        dosage: dosage,
        frequency: frequency,
      };
  
      // Add the new medication to the existing medications array
      existingMedications.push(newMedication);
  
      // Save the updated medications array back to AsyncStorage
      await AsyncStorage.setItem('medications', JSON.stringify(existingMedications));
  
      // Reset the state variables
      setDosage('');
      setFrequency('');
      setIsAddingMedication(false);
      setAddButtonVisible(true);
  
      // Optional: Navigate to a different screen or show a success message
      // navigation.navigate('UserProfile');
    } catch (error) {
      console.error('Error saving medication:', error);
      // Handle error, show error message, etc.
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (medicationName.trim() !== '') {
          const response = await axios.get(
            `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicationName}`
          );

          const medicationInfo = response.data.results[0];

          if (medicationInfo) {
            const genericUse = medicationInfo.openfda.generic_name;
            const description = medicationInfo.purpose;
            const dosageAndStrengths = medicationInfo.dosage_and_administration;
            const warningsAndCautions = medicationInfo.warnings;
            const route = medicationInfo.route;

            const splSetId = medicationInfo.openfda && medicationInfo.openfda.spl_set_id;

            const imageUrl = splSetId
              ? `https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=${splSetId}`
              : null;

            setMedicationData({
              genericUse,
              description,
              dosageAndStrengths,
              warningsAndCautions,
              route,
              imageUrl,
            });
          } else {
            setMedicationData(null);
          }
        }
      } catch (error) {
        console.error('Error fetching medication data:', error);
        setMedicationData(null);
      }
    };

    fetchData();
  }, [medicationName]);

  const handleInputChange = (text) => {
    setMedicationName(text);
  };

  return (
    
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Medication Name:</Text>
            <TextInput
              style={styles.input}
              value={medicationName}
              onChangeText={handleInputChange}
            />
          </View>
          {addButtonVisible && (
            <Button title="Add Medication" onPress={handleAddMedication} color="#3498db" />
          )}
          {isAddingMedication && (
            <View style={styles.formContainer}>
              <Text style={styles.info}>
                <Text style={styles.strong}>Name:</Text> {medicationData.genericUse}
              </Text>
              <Text style={styles.formLabel}>Dosage:</Text>
              <TextInput
                style={styles.formInput}
                value={dosage}
                onChangeText={(text) => setDosage(text)}
              />

              <Text style={styles.formLabel}>Frequency:</Text>
              <TextInput
                style={styles.formInput}
                value={frequency}
                onChangeText={(text) => setFrequency(text)}
              />
              <Button title="Save" onPress={handleSaveMedication} color="#3498db" />
            </View>
          )}
          <View style={styles.medicationInfo}>
            {medicationData && (
              <View>
                <Text style={styles.title}>{medicationData.genericUse}</Text>
        
                <Text style={styles.info}>
                  <Text style={styles.strong}>Name:</Text> {medicationData.genericUse}
                </Text>
                <Text style={styles.info}>
                  <Text style={styles.strong}>Purpose:</Text> {medicationData.description}
                </Text>
                <Text style={styles.info}>
                  <Text style={styles.strong}>Dosage and Strengths:</Text>{' '}
                  {medicationData.dosageAndStrengths}
                </Text>
                <Text style={styles.info}>
                  <Text style={styles.strong}>Warnings and Cautions:</Text>{' '}
                  {medicationData.warningsAndCautions}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View>
          <BottomTabNavigator />
        </View>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
    maxWidth: 400,
  },
  labelContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 10,
    color: '#3498db',
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
  },
  formContainer: {
    marginTop: 10,
  },
  formLabel: {
    marginTop: 10,
    marginBottom: 5,
    color: '#3498db',
  },
  formInput: {
    width: '100%',
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
  },
  medicationInfo: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#3498db',
  },
  info: {
    marginBottom: 8,
    color: '#555',
  },
  strong: {
    fontWeight: 'bold',
    color: '#3498db',
  },
});

export default MedicationSearch;
