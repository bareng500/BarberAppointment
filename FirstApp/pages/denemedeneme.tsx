import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

const YourComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const firebaseConfig = {
          apiKey: "AIzaSyDV_UmjjYjlsigl91swhFR9k8lzEAMPkz0",
          authDomain: "appointment-b5ef5.firebaseapp.com",
          projectId: "appointment-b5ef5",
          storageBucket: "appointment-b5ef5.appspot.com",
          messagingSenderId: "154407982994",
          appId: "1:154407982994:web:801cfb210ac3fd366c534b"
        };

        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);

        // 'users' koleksiyonunu seç
        const querySnapshot = await getDocs(collection(firestore, 'users'));

        // Verileri al ve state'i güncelle
        const fetchedData = querySnapshot.docs.map((doc) => doc.data());
        setData(fetchedData);
      } catch (error) {
        console.error('Firestore veri alınırken hata oluştu:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Randevu Yapılan Kişi"
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

export default YourComponent;