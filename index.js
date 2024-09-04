import { AppRegistry } from 'react-native';
import App from './App'; // Import your root componentz
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // Handle the background message here
});

AppRegistry.registerComponent('MeraBachhaApp', () => App);



