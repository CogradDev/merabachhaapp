import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        const parentData = await AsyncStorage.getItem('parentData');

        if (isLoggedIn === 'true' && email && password && parentData) {
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
    // Show a loading screen or nothing while checking the login status
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }} // Hide all headers initially
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="progress" component={ProgressReportScreen} />
        <Stack.Screen name="fees" component={FeesManagementScreen} />
        <Stack.Screen name="complaint" component={ComplaintsScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
