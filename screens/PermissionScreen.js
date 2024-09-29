import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PermissionScreen = ({ navigation, route }) => {
  const parentData = route.params?.parentData;
  const [permissionsStatus, setPermissionsStatus] = useState({});

  const handlePermissionRequest = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ]);
  
      console.log('Permission Results:', granted);
  
      const allPermissionsGranted = Object.values(granted).every(
        status => status === PermissionsAndroid.RESULTS.GRANTED
      );
  
      if (allPermissionsGranted) {
        navigation.navigate('Main', { parentData });
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
          <Text style={styles.cell}>नोटिफिकेशन</Text>
        </View>

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
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: width * 0.05,
  },
  subtitle: {
    fontSize: width * 0.04,
    marginBottom: width * 0.05,
    textAlign: 'center',
  },
  table: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: width * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6495ed',
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.08,
    borderRadius: width * 0.02,
    marginTop: width * 0.1,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default PermissionScreen;
