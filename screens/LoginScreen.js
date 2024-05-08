import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    // Here you can add logic to verify the phone number and navigate to the child's information screen
    if (phoneNumber.trim() === '') {
      alert('Please enter a valid phone number.');
      return;
    }

    // For demonstration purposes, navigate to a placeholder child information screen
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      {/* Company logo image */}
      <Image
        source={require('../src/image/cogradLogo.png')} // Replace '../path/to/your/company_logo.png' with the actual path to your company logo image
        style={styles.logo}
      />
      {/* Added image */}
      <Image
        source={require('../src/image/MobileLogin.png')} // Replace '../path/to/your/image.jpg' with the actual path to your image
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
    paddingHorizontal: 20,
    backgroundColor: '#fff', // Added background color
  },
  logo: {
    position: 'absolute',
    top: 20, // Adjust the top position as needed
    left: 20, // Adjust the left position as needed
    width: 140, // Adjust the width as needed
    height: 80, // Adjust the height as needed
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#6495ed', // Changed border color to a lighter color
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 18,
    color: '#333', // Changed text color to a darker color
    backgroundColor: '#f0f0f0', // Added background color for input
  },
  button: {
    backgroundColor: '#6495ed', // Added background color for the button
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff', // Changed text color of the button text to white
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 500, // Adjust the width as needed
    height: 500, // Adjust the height as needed
    marginBottom: 40, // Increased margin for better spacing
  },
});

export default LoginScreen;
