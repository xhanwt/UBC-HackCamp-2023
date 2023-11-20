import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavBar from './BottomTabNavigator';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from AsyncStorage or your authentication context
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User Profile</Text>
      {userData && (
        <View>
          <Text style={styles.info}>
            <Text style={styles.strong}>Name:</Text> {userData.name}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.strong}>Email:</Text> {userData.email}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.strong}>Gender:</Text> {userData.gender}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.strong}>Health Card Number:</Text> {userData.healthCardNumber}
          </Text>
        </View>
      )}
      <View>
        <BottomNavBar />
      </View>
    </View>
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
  label: {
    fontSize: 24,
    marginBottom: 16,
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

export default UserProfile;