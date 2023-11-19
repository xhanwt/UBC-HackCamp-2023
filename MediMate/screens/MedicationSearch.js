import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import ScreenWrapper from './ScreenWrapper';

const MedicationSearch = () => {
  const [medicationName, setMedicationName] = useState('');
  const [medicationData, setMedicationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (medicationName.trim() !== '') {
          const response = await axios.get(
            `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicationName}`
          );

          const medicationInfo = response.data.results[0];

          if (medicationInfo) {
            const genericUse = medicationInfo.generic_name;
            const description = medicationInfo.description;
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
    <ScreenWrapper>
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
          <View style={styles.medicationInfo}>
            {medicationData && (
              <View>
                <Text style={styles.title}>{medicationData.genericUse}</Text>
                {medicationData.imageUrl && (
                  <Image source={{ uri: medicationData.imageUrl }} style={styles.image} />
                )}
                <Text style={styles.info}>
                  <Text style={styles.strong}>Description:</Text> {medicationData.description}
                </Text>
                <Text style={styles.info}>
                  <Text style={styles.strong}>Dosage and Strengths:</Text>{' '}
                  {medicationData.dosageAndStrengths}
                </Text>
                <Text style={styles.info}>
                  <Text style={styles.strong}>Warnings and Cautions:</Text>{' '}
                  {medicationData.warningsAndCautions}
                </Text>
                <Text style={styles.info}>
                  <Text style={styles.strong}>Route:</Text> {medicationData.route}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxWidth: 400,
  },
  labelContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  medicationInfo: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    maxWidth: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  info: {
    marginBottom: 8,
  },
  strong: {
    fontWeight: 'bold',
  },
});

export default MedicationSearch;
