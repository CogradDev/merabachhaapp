import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'शिक्षक से नया संदेश', message: 'आपके शिक्षक से एक नया संदेश मिला है।', read: false },
    { id: 2, title: 'असाइनमेंट रिमाइंडर', message: 'रिमाइंडर: अपना विज्ञान प्रोजेक्ट शुक्रवार तक सबमिट करें।', read: true },
    { id: 3, title: 'आगामी कार्यक्रम', message: 'आगामी कार्यक्रम के बारे में न भूलें: स्कूल सभा अगले हफ्ते!', read: false },
    { id: 4, title: 'अंतर्राष्ट्रीय परिपत्र', message: 'आज आपके लिए एक नया अंतर्राष्ट्रीय परिपत्र है।', read: false },
    { id: 5, title: 'स्थानीय खेल क्षेत्र समाचार', message: 'स्थानीय खेल क्षेत्र में नवीनतम खबरें जानने के लिए जरूर देखें।', read: true },
    // Add more notifications as needed
  ]);

  const markAsRead = id => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}>
      <Text style={[styles.notificationTitle, { fontSize: width * 0.04 }]}>{item.title}</Text>
      <Text style={[styles.notificationMessage, { fontSize: width * 0.035 }]}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: '#6495ed', fontSize: width * 0.06 }]}>सूचनाएं</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: width * 0.04,
    paddingTop: width * 0.05,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: width * 0.05,
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: width * 0.05,
    marginBottom: width * 0.03,
    padding: width * 0.06,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  unreadNotification: {
    backgroundColor: '#ffecb3', // Unread notification color
  },
  readNotification: {
    backgroundColor: '#fff', // Read notification color
  },
  notificationTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: width * 0.015,
  },
  notificationMessage: {
    color: '#555',
  },
});

export default NotificationScreen;
