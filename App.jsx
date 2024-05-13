import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import BookOutline from './src/svg/BookOutline';
// import Book from './src/svg/Book';
// import Wallet from './src/svg/Wallet';
// import WalletOutline from './src/svg/WalletOutline';
// import Chat from './src/svg/Chat';
// import ChatOutline from './src/svg/ChatOutline';
import ProgressReportScreen from './screens/ProgressReportScreen';
import FeesManagementScreen from './screens/FeesManagementScreen';
import ComplaintsScreen from './screens/ComplaintsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import PermissionScreen from './screens/PermissionScreen';
import 'react-native-gesture-handler';
import NotificationScreen from './screens/NotificationScreen';
import MainScreen from './screens/MainScreen';

// const Tab = createBottomTabNavigator();
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

// const MainApp = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="प्रगति"
//         component={ProgressReportScreen}
//         options={{
//           tabBarIcon: ({ focused }) => {
//             return focused ? <Book color="#6495ed" /> : <BookOutline color="#dcdcdc" />;
//           },
//           headerShown: null
//         }}
//       />
//       <Tab.Screen
//         name="फीस"
//         component={FeesManagementScreen}
//         options={{
//           tabBarIcon: ({ focused }) => {
//             return focused ? <Wallet color="#6495ed" /> : <WalletOutline color="#dcdcdc" />;
//           },
//           headerShown: null
//         }}
//       />
//       <Tab.Screen
//         name="शिकायत"
//         component={ComplaintsScreen}
//         options={{
//           tabBarIcon: ({ focused }) => {
//             return focused ? <Chat color="#6495ed" /> : <ChatOutline color="#dcdcdc" />;
//           },
//           headerShown: null
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

export default App;
