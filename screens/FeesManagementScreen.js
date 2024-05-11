import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const FeesManagementScreen = () => {
  const totalFees = 5000;
  const paidAmount = 3000;
  const remainingBalance = totalFees - paidAmount;

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
    marginBottom: width * 0.03,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
});

export default FeesManagementScreen;
