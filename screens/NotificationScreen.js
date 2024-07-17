import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import apiList from '../api/apiList';

const { width } = Dimensions.get('window');

const NotificationScreen = ({ route }) => {
  const parentId = route.params?.parentId;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch notifications data from backend
  const fetchNotifications = async () => {
    const notificationsUrl = apiList.getNotifications(parentId);

    try {
      const response = await fetch(notificationsUrl);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = id => {
    const updatedNotifications = notifications.map(notification =>
      notification._id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]}
      onPress={() => markAsRead(item._id)}>
      <Text style={[styles.notificationTitle, { fontSize: width * 0.04 }]}>{item.title}</Text>
      <Text style={[styles.notificationMessage, { fontSize: width * 0.035 }]}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: '#6495ed', fontSize: width * 0.06 }]}>सूचनाएं</Text>
      {loading ? (
        <Text style={styles.loadingText}>लोड हो रहा है...</Text>
      ) : notifications.length === 0 ? (
        <Text style={styles.noNotificationsText}>कोई सूचनाएं नहीं हैं</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item._id.toString()}
        />
      )}
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
  loadingText: {
    textAlign: 'center',
    fontSize: width * 0.04,
    color: '#555',
  },
  noNotificationsText: {
    textAlign: 'center',
    fontSize: width * 0.04,
    color: '#555',
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
