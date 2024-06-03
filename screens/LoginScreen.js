import React, { useRef, useState } from 'react';
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
} from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import PhoneInput from 'react-native-phone-number-input';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);

  const handleLogin = async () => {
    const audioPermission = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);

    if (formattedValue.trim() === '') {
      alert('कृपया सही फ़ोन नंबर डाले');
      return;
    }

    if (audioPermission !== RESULTS.GRANTED) {
      navigation.navigate('PermissionScreen');
    } else {
      navigation.navigate('Main');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              placeholder = "अपना फोन नंबर डालें"
              withDarkTheme
              withShadow
              autoFocus
              containerStyle={styles.phoneInputContainer}
              textContainerStyle={styles.phoneInputTextContainer}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>लॉग इन करें</Text>
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
  phoneInputContainer: {
    width: width * 0.8,
    borderWidth: 2,
    borderColor: '#6495ed',
    borderRadius: 10,
    padding: height * 0.01,
    marginBottom: height * 0.03,
    fontSize: width * 0.04,
    color: '#333',
  },
  phoneInputTextContainer: {
    paddingVertical: 0,
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
