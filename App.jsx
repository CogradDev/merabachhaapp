import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressReportScreen from './screens/ProgressReportScreen';
import FeesManagementScreen from './screens/FeesManagementScreen';
import ComplaintsScreen from './screens/ComplaintsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import PermissionScreen from './screens/PermissionScreen';
import 'react-native-gesture-handler';
import NotificationScreen from './screens/NotificationScreen';
import MainScreen from './screens/MainScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: null }}>
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
