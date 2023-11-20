import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import BottomTabNavigator from './BottomTabNavigator';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [infoList, setInfoList] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    // Simulated data for demonstration
    // Replace this with fetching data related to the selected date from your backend or storage
    const mockData = [
      { id: '1', title: 'Event 1', description: 'Description for Event 1' },
      { id: '2', title: 'Event 2', description: 'Description for Event 2' },
      // Add more data here as needed...
    ];
    const filteredData = mockData.filter((item) => item.date === day.dateString); // Assuming 'date' property in mockData
    setInfoList(filteredData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: 'blue',
            },
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Information for {selectedDate}:</Text>
        <FlatList
          data={infoList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.infoItem}>
              <Text style={styles.infoItemTitle}>{item.title}</Text>
              <Text style={styles.infoItemDescription}>{item.description}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <BottomTabNavigator />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoItemDescription: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CalendarPage;