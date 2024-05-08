import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    // Navigate to the next screen (e.g., login or home screen)
    navigation.navigate('LoginScreen'); // Change 'LoginScreen' to your actual screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>मेरा बच्चा</Text>
          <Text style={styles.subtitle}>आपका स्वागत है!</Text>
        </View>
        {/* Custom styled button */}
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>आरंभ करें</Text>
        </TouchableOpacity>
      </View>
      {/* Image added */}
      <Image
        source={require('../src/image/Parents.png')} // Replace '../path/to/your/image.jpg' with the actual path to your image
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginBottom: -20,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 140,
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: 500,
    height: 500,
  },
  button: {
    backgroundColor: '#6495ed',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
