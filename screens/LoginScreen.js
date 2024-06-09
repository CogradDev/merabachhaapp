import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import apiList from '../api/apiList';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const audioPermission = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);

    if (email.trim() === '' || password.trim() === '') {
      alert('कृपया सही ईमेल और पासवर्ड डालें');
      return;
    }

    setIsLoading(true); // Start loading

    // API call to backend
    try {
      const response = await fetch(apiList.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful! User data:', data);

        // Save login status, credentials, and parent data to AsyncStorage
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('parentData', JSON.stringify(data));

        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: audioPermission !== RESULTS.GRANTED ? 'PermissionScreen' : 'Main', params: { parentData: data } }],
        });

        navigation.dispatch(resetAction);
      } else {
        alert('लॉगिन विफल! कृपया अपना ईमेल और पासवर्ड जांचें।');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('एक त्रुटि पाई गई। कृपया बाद में पुन: प्रयास करें।');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
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
              placeholder="अपना ईमेल डालें"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#888"
            />

            <TextInput
              style={styles.input}
              placeholder="अपना पासवर्ड डालें"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>लॉग इन करें</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  inner: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.7,
    height: height * 0.2,
    marginBottom: height * 0.02,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: height * 0.05,
  },
  input: {
    width: width * 0.8,
    height: height * 0.07,
    borderWidth: 1,
    borderColor: '#6495ed',
    borderRadius: 25,
    padding: 15,
    marginBottom: height * 0.02,
    backgroundColor: '#f9f9f9',
    fontSize: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    color: '#333',
  },
  button: {
    backgroundColor: '#6495ed',
    padding: height * 0.02,
    borderRadius: 25,
    width: width * 0.8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
