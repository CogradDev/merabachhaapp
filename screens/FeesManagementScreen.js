import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress/Circle';

const { width, height } = Dimensions.get('window');

const FeesManagementScreen = ({ route }) => {
  const parentId = route.params?.parentId;
  const studentId = route.params?.studentId;
  const totalFees = 5000;
  const paidAmount = 3000;
  const remainingBalance = totalFees - paidAmount;  
  const [feesData, setFeesData] = useState(null);
  const [attendancePercentage, setAttendancePercentage] = useState(10);


  // Function to fetch fees details and attendance info from backend
  const fetchData = async () => {
    const feesUrl = apiList.fees(parentId);
    const attendanceUrl = apiList.attendance(studentId);

    try {
      const feesResponse = await fetch(feesUrl);
      const feesData = await feesResponse.json();
      setFeesData(feesData);

      const attendanceResponse = await fetch(attendanceUrl);
      const attendanceData = await attendanceResponse.json();
      setAttendancePercentage(attendanceData.attendancePercentage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    //fetchData(); 
  }, []);

  return (
    <View colors={['#E9EDF0', '#C5D3DC']} style={styles.container}>
      <Text style={styles.heading}>फीस प्रबंधन</Text>

      <View style={styles.feesContainer}>
        <Text style={styles.sectionHeading}>फीस</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>कुल फीस:</Text>
          <Text style={styles.infoValue}>₹{totalFees}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>चुकाई गई राशि:</Text>
          <Text style={styles.infoValue}>₹{paidAmount}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>शेष राशि:</Text>
          <Text style={styles.infoValue}>₹{remainingBalance}</Text>
        </View>
      </View>

      <View style={styles.attendanceContainer}>
        <Text style={styles.attendanceHeading}>उपस्थिति</Text>
        <ProgressCircle
          size={width * 0.6}
          indeterminate={false}
          progress={attendancePercentage / 100}
          borderWidth={8}
          color="#6495ed"
          unfilledColor="#E3E8EC"
          thickness={20}
          showsText
          formatText={() => `${attendancePercentage}%`}
          textStyle={styles.progressText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical : height * 0.02,
    backgroundColor: '#fff',
  },
  heading: {

    marginBottom: height * 0.05,

    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#6495ed',
  },
  feesContainer: {
    backgroundColor: '#FFF',
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.05,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: height * 0.04,
    width: '80%',
  },
  sectionHeading: {
    fontSize: width * 0.06,
    // color: '#35424A',
    marginBottom: height * 0.02,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },
  infoLabel: {
    color: '#35424A',
    fontSize: width * 0.045,
  },
  infoValue: {
    color: '#6495ed',
    fontSize: width * 0.065,
    fontWeight: 'bold',
  },
  attendanceContainer: {
    alignItems: 'center',
  },
  attendanceHeading: {
    fontSize: width * 0.06,
    // color: '#35424A',
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
    fontWeight: 'bold',
  },
  progressText: {
    color: '#6495ed',
    fontSize: width * 0.1,
    fontWeight: 'bold',
  },
});

export default FeesManagementScreen;
