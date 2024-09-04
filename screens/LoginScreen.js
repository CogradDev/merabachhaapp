import React, {useRef, useState} from 'react';
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
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import PhoneInput from 'react-native-phone-number-input';
import apiList from '../api/apiList';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const phoneInput = useRef(null);

  const handliLogin = async () => {
    if (formattedValue.trim() === '') {
      alert('कृपया सही फ़ोन नंबर डाले');
      return;
    }

    setIsLoading(true); // Start loading

    const token = await messaging().getToken();

    // API call to send OTP
    try {
      const loginUrl = apiList.login;
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phoneNumber: value, token: token}), //for formated value use formatedValue
      });

      const data = await response.json();
      console.log('Login response data:', data);
      if (response.ok) {
        setIsLogin(true);
        // Save login status, credentials, and parent data to AsyncStorage
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('phone', value);
        await AsyncStorage.setItem('parentData', JSON.stringify(data));

        const resetAction = CommonActions.reset({
          index: 0,
          routes: [
            {
              name:
                PERMISSIONS !== RESULTS.GRANTED ? 'PermissionScreen' : 'Main',
              params: {parentData: data},
            },
          ],
        });
        navigation.dispatch(resetAction);
      } else {
        alert('विफल! कृपया अपना फोन नंबर जांचें।');
      }
    } catch (error) {
      console.error('Error during Login:', error);
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

            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="IN"
              layout="first"
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setFormattedValue(text);
              }}
              placeholder="अपना फोन नंबर डालें"
              withDarkTheme
              withShadow
              containerStyle={styles.phoneInputContainer}
              textContainerStyle={styles.phoneInputTextContainer}
            />

            <TouchableOpacity style={styles.button} onPress={handliLogin}>
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
    marginBottom: height * 0.05,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: height * 0.05,
  },
  phoneInputContainer: {
    width: width * 0.8,
    borderWidth: 2,
    borderColor: '#6495ed',
    borderRadius: 12,
    padding: height * 0.01,
    marginBottom: height * 0.03,
    fontSize: width * 0.04,
    color: '#333',
  },
  phoneInputTextContainer: {
    paddingVertical: 0,
  },
  input: {
    width: width * 0.8,
    height: height * 0.07,
    borderWidth: 1,
    borderColor: '#6495ed',
    borderRadius: 12,
    padding: 15,
    marginBottom: height * 0.02,
    backgroundColor: '#f9f9f9',
    fontSize: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    color: '#333',
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
});

export default LoginScreen;
