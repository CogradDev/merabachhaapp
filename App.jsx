import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressReportScreen from './screens/ProgressReportScreen';
import FeesManagementScreen from './screens/FeesManagementScreen';
import ComplaintsScreen from './screens/ComplaintsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import PermissionScreen from './screens/PermissionScreen';
import NotificationScreen from './screens/NotificationScreen';
import MainScreen from './screens/MainScreen';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {Linking, ActivityIndicator} from 'react-native';

const Stack = createStackNavigator();

const NAVIGATION_IDS = [
  'Main',
  'Progress',
  'Fees',
  'Complaint',
  'Notification',
];

function buildDeepLinkFromNotificationData(data) {
  console.log(data);
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'Main') {
    return 'myapp://Main';
  }
  if (navigationId === 'Notification') {
    return 'myapp://Notification';
  }
  return null;
}

const linking = {
  prefixes: ['myapp://'],
  config: {
    initialRouteName: 'Main',
    screens: {
      Main: 'Main',
      Notification: 'Notification',
    },
  },

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },

  subscribe(listener) {
    const onReceiveURL = ({url}) => listener(url);
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // Handle Background Message Here
    });

    const foreground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message has arrived', remoteMessage);
    });

    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
      foreground();
    };
  },
};

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        console.log('FCM Token', token);
      }
    };

    requestUserPermission();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        if (__DEV__) {
          setInitialRoute('WelcomeScreen');
          return;
        }

        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        const parentData = await AsyncStorage.getItem('parentData');

        if (isLoggedIn === 'true') {
          setInitialRoute('Main');
        } else {
          setInitialRoute('WelcomeScreen');
        }
      } catch (e) {
        console.error('Failed to load login status.', e);
        setInitialRoute('WelcomeScreen');
      }
    };

    checkLoginStatus();
  }, []);

  if (initialRoute === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Progress" component={ProgressReportScreen} />
        <Stack.Screen name="Fees" component={FeesManagementScreen} />
        <Stack.Screen name="Complaint" component={ComplaintsScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
