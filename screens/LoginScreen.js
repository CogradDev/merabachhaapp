import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = async () => {
    const audioPermission = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);

    if (phoneNumber.trim() === '') {
      alert('Please enter a valid phone number.');
      return;
    }

    if (audioPermission !== RESULTS.GRANTED) {
      navigation.navigate('PermissionScreen');
    } else {
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../src/image/cogradLogo.png')}
        style={styles.logo}
      />
      <Image
        source={require('../src/image/MobileLogin.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="अपना फोन नंबर डालें"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>लॉग इन करें</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ackgroundColor: '#fff',
  },
  logo: {
    position: 'absolute',
    top: height * 0.04,
    width: width * 0.7,
    height: height * 0.2,
  },
  input: {
    width: width * 0.8,
    borderWidth: 2,
    borderColor: '#6495ed',
    borderRadius: 10,
    padding: height * 0.02,
    marginBottom: height * 0.03,
    fontSize: width * 0.04,
    color: '#333',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#6495ed',
    padding: height * 0.02,
    borderRadius: 10,
    width: width * 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: width,
    height: width,
    marginTop :height * 0.2,
  },
});

export default LoginScreen;
