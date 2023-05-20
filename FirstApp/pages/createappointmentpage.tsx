import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import HourTable from './createdetailpage';


const AppointmentScreen: React.FC = () => {
  const [appointments, setAppointments] = useState<string[]>([]);
  const [appointment, setAppointment] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const addAppointment = () => {
    setAppointments([...appointments, appointment]);
    setAppointment('');
  };

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Berber Randevu Sistemi</Text>
      <TextInput
        style={styles.input}
        value={appointment}
        onChangeText={(text) => setAppointment(text)}
        placeholder="Randevu Yapılan Kişi"
      />
      <TouchableOpacity style={styles.button} onPress={addAppointment}>
        <Text style={styles.buttonText}>Randevu Oluştur</Text>
      </TouchableOpacity>
      {appointments.map((item, index) => (
        <Text key={index} style={styles.item}>
          {item}
        </Text>
      ))}
      <Calendar
        locale="tr"
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: '#3D6DCC' },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 48,
  },
  input: {
    height: 40,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 12,
    fontSize: 18,
    marginBottom: 8,
  },
});

export default AppointmentScreen;



