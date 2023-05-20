import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Calendar } from 'react-native-calendars';

// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
//import {getAuth} from 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';

//import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
//import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV_UmjjYjlsigl91swhFR9k8lzEAMPkz0",
  authDomain: "appointment-b5ef5.firebaseapp.com",
  projectId: "appointment-b5ef5",
  storageBucket: "appointment-b5ef5.appspot.com",
  messagingSenderId: "154407982994",
  appId: "1:154407982994:web:801cfb210ac3fd366c534b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const db = getFirestore(app);
// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true
// });

// const colRef = collection(db, 'appointments');
// getDocs(colRef).then(
//   (snapshot) => {
//     console.log("appointments: ")
//     console.log(snapshot.docs);
//   }
// )

// const cityRef = db.collection('cities').doc('DC').get();
// console.log(cityRef);

type RootStackParamList = {
  Home: undefined;
  Details: { userName: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
type DetailScreenRouteProp = RouteProp<RootStackParamList, "Details">;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
  routeHome: HomeScreenRouteProp;
  route: DetailScreenRouteProp;
  onCellPress?: (cellId: string) => void;
  userName: string;
};

type CellData = {
  id: string;
  text: string;
};

const TABLE_ROWS = 20;
const TABLE_COLUMNS = 5;


function HomeScreen({ navigation }: Props) {

  const [appointments, setAppointments] = useState<string[]>([]);
  const [appointment, setAppointment] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [inputValue, setInputValue] = useState("");

  const addAppointment = () => {
    setAppointments([...appointments, appointment]);
    setAppointment('');
  };

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        placeholder="Randevu Yapılan Kişi"
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', { userName: inputValue })}>
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
  )
}

function DetailsScreen({ onCellPress, route }: Props) {
  const { userName } = route.params;

  
  
  try {
    // setDoc(doc(db, "users", "DENEME"), {
    //   firstName: "Barış",
    //   surName: "Engin",
    //   birthyear: "1996",
    //   description: "deneme"
    // });
    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }


  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const startTime = 10;
  const weekdays: string[] = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

  const data = Array(TABLE_ROWS * TABLE_COLUMNS)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
      text: Math.floor((index) / 5) % 2 == 0 ? ((Math.floor((index) / 5) / 2) + startTime).toString() + ':00' : (((Math.floor((index) / 5) - 1) / 2) + startTime).toString() + ':30',
    }));

  const handleCellPress = (cellId: string, cellText: string) => {
    setSelectedCell(cellId);
    if (onCellPress) {
      onCellPress(cellId);
    }
  };

  const renderItem = ({ item }: { item: CellData }) => {
    const backgroundColor = item.id === selectedCell ? '#49f025' : '#fff';
    item.text = item.id === selectedCell ? item.text + '\n' + userName : item.text;
    return (
      <TouchableOpacity
        onPress={() => handleCellPress(item.id, item.text)}
        style={[styles.cell, { backgroundColor }]}
      >
        <Text>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    const headers = Array.from(Array(TABLE_COLUMNS).keys()).map(index => (
      <View key={index} style={styles.headerCell}>
        <Text style={styles.headerText}>{weekdays[index]}</Text>
      </View>
    ));
    return <View style={styles.headerRow}>{headers}</View>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={TABLE_COLUMNS}
        keyExtractor={item => item.id}
        extraData={selectedCell}
        ListHeaderComponent={renderHeader}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Randevu Saatini Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

function TestApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen as React.ComponentType} />
        <Stack.Screen name="Details" component={DetailsScreen as React.ComponentType} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
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
  cell: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#eee',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default TestApp;