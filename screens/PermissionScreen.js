import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';

const PermissionScreen = ({ navigation }) => {
  const [permissionsStatus, setPermissionsStatus] = useState({});

  const handlePermissionRequest = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        //PermissionsAndroid.PERMISSIONS.NOTIFICATIONS,
        // Add more permissions here following the same format
        // PermissionsAndroid.PERMISSIONS.CAMERA,
        // PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ]);

      console.log('Permission Results:', granted);

      if (
        Object.values(granted).every(status => status === PermissionsAndroid.RESULTS.GRANTED)
      ) {
        navigation.navigate('progress');
      } else {
        alert('कृपया सभी आवश्यक अनुमतियां देने के लिए स्वीकृति दें।');
      }
    } catch (error) {
      console.log('Error requesting permissions:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>अनुमति आवश्यक है</Text>
      <Text style={styles.subtitle}>
        निम्नलिखित अनुमतियां देने के लिए स्वीकृति दें:
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>माइक्रोफ़ोन</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>अधिसूचनाएं</Text>
        </View>
        {/* Add more permissions here following the same format */}
        {/* <View style={styles.row}>
          <Text style={styles.cell}>कैमरा</Text>
        </View> */}
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePermissionRequest}>
        <Text style={styles.buttonText}>अनुमति दें</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6495ed',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PermissionScreen;
