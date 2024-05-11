import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../src/image/cogradLogo.png')}
        style={styles.logo}
      />
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>मेरा बच्चा</Text>
          <Text style={styles.subtitle}>आपका स्वागत है!</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>आरंभ करें</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../src/image/Parents.png')}
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
    paddingBottom: height * 0.002,
  },
  logo: {
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.05,
    width: width * 0.31,
    height: height * 0.118,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.06,
    marginBottom: height * 0.2,
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: width ,
    height: width * 0.9,
  },
  button: {
    backgroundColor: '#6495ed',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.06,
    borderRadius: 5,
    marginBottom: height * 0.03,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
