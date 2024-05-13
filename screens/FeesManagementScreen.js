import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const FeesManagementScreen = () => {
  const totalFees = 5000;
  const paidAmount = 3000;
  const remainingBalance = totalFees - paidAmount;
  const attendancePercentage = 80; // Assuming attendance percentage

  const handlePayment = () => {
    console.log('Payment successful!');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: '#6495ed', fontSize: width * 0.06 }]}>फीस प्रबंधन</Text>

      <View style={styles.content}>
        <View style={styles.box}>
          <View style={styles.infoBox}>
            <Text style={[styles.infoLabel, { fontSize: width * 0.04 }]}>कुल फीस:</Text>
            <Text style={[styles.infoValue, { fontSize: width * 0.05 }]}>₹{totalFees}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.infoBox}>
            <Text style={[styles.infoLabel, { fontSize: width * 0.04 }]}>चुकाई गई राशि:</Text>
            <Text style={[styles.infoValue, { fontSize: width * 0.05 }]}>₹{paidAmount}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.infoBox}>
            <Text style={[styles.infoLabel, { fontSize: width * 0.04 }]}>शेष राशि:</Text>
            <Text style={[styles.infoValue, { fontSize: width * 0.05 }]}>₹{remainingBalance}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.heading, styles.attendanceHeading]}>उपस्थिति</Text>
        </View>
        <View style={styles.attendanceBox}>
          <View style={styles.infoBox}>
            <Text style={[styles.infoLabel, styles.attendanceLabel]}>उपस्थिति:</Text>
            <Text style={[styles.infoValue, styles.attendanceValue]}>{attendancePercentage}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.05,
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',  
    marginBottom: width * 0.07,

  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  box: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: width * 0.02,
    padding: width * 0.1,
    marginBottom: width * 0.05,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  attendanceBox: {
    backgroundColor: '#ff7f50', // Coral color
    borderRadius: width * 0.02,
    padding: width * 0.1,
    marginBottom: width * 0.05,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.02,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    fontWeight: 'bold',
    color: '#6495ed',
  },
  attendanceHeading: {
    fontSize: width * 0.06,
    color: '#6495ed',
    marginBottom: width * 0.05,
    textAlign: 'center',
    fontWeight: 'bold',
    textAlign: 'center',  
    marginTop: width * 0.05,
  },
  attendanceLabel: {
    fontSize: width * 0.04,
    color: '#fff', // White color for attendance label
  },
  attendanceValue: {
    fontSize: width * 0.05,
    color: '#fff', // White color for attendance value
  },
});

export default FeesManagementScreen;
