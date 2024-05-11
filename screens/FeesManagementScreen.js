import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FeesManagementScreen = () => {
  const totalFees = 5000;
  const paidAmount = 3000;
  const remainingBalance = totalFees - paidAmount;

  const handlePayment = () => {
    // Hypothetical payment function, can be replaced with actual payment logic
    console.log('Payment successful!');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: '#6495ed' }]}>फीस प्रबंधन</Text>

      <View style={styles.content}>
        <View style={styles.box}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>कुल फीस:</Text>
            <Text style={styles.infoValue}>₹{totalFees}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>चुकाई गई राशि:</Text>
            <Text style={styles.infoValue}>₹{paidAmount}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>शेष राशि:</Text>
            <Text style={styles.infoValue}>₹{remainingBalance}</Text>
          </View>
        </View>
      </View>
      {/* <Button title="Make Payment" onPress={handlePayment} color="#009688" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    padding: 20, // Add padding top for the header
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1, // Take remaining space after header and button
    justifyContent: 'center', // Center content vertically
  },
  box: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    paddingVertical :50,
    elevation: 3, // Add elevation for shadow effect (Android)
    shadowColor: '#000', // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
    shadowOpacity: 0.25, // Shadow opacity (iOS)
    shadowRadius: 3, // Shadow radius (iOS)
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 20,
    color: '#333',
    fontWeight : "bold",
  },
  infoValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6495ed',
  },
  button: {
    backgroundColor: '#009688',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default FeesManagementScreen;
