import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import apiList from '../api/apiList';

const {width, height} = Dimensions.get('window');

// Configure the calendar locale to Hindi
LocaleConfig.locales['hi'] = {
  monthNames: [
    'जनवरी',
    'फरवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्टूबर',
    'नवंबर',
    'दिसंबर',
  ],
  monthNamesShort: [
    'जन.',
    'फर.',
    'मार्च',
    'अप्रै.',
    'मई',
    'जून',
    'जुल.',
    'अग.',
    'सितं.',
    'अक्टू.',
    'नव.',
    'दिसं.',
  ],
  dayNames: [
    'रविवार',
    'सोमवार',
    'मंगलवार',
    'बुधवार',
    'गुरुवार',
    'शुक्रवार',
    'शनिवार',
  ],
  dayNamesShort: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
};
LocaleConfig.defaultLocale = 'hi';

const FeesManagementScreen = ({route}) => {
  const parentId = route.params?.parentId;
  const studentId = route.params?.studentId;
  const [feesData, setFeesData] = useState({
    totalFees: 0,
    paidAmount: 0,
    remainingAmount: 0,
  });
  const [attendanceData, setAttendanceData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to fetch fees details and attendance info from backend
  const fetchData = async () => {
    const feesUrl = apiList.fees(parentId);
    const attendanceUrl = apiList.attendance(studentId);

    try {
      const feesResponse = await fetch(feesUrl);
      const feesData = await feesResponse.json();
      setFeesData({
        totalFees: feesData.totalFees,
        paidAmount: feesData.totalPaidAmount,
        remainingAmount: feesData.remainingAmount,
      });

      const attendanceResponse = await fetch(attendanceUrl);
      const attendanceData = await attendanceResponse.json();

      console.log(attendanceData);
      if (attendanceData.attendance && attendanceData.attendance.length > 0) {
        const absences = {};
        attendanceData.attendance.forEach(att => {
          const date = new Date(att.date);
          const dateString = date.toISOString().split('T')[0];
          
          // Initialize the absence object with common properties
          let absence = {
            selected: true,
            marked: true,
          };
      
          // Assign colors based on status
          switch (att.status) {
            case 'a':
              absence.selectedColor = 'red';
              absence.dotColor = 'red';
              break;
            case 'p':
              absence.selectedColor = 'green';
              absence.dotColor = 'green';
              break;
            case 'l':
              absence.selectedColor = 'grey';
              absence.dotColor = 'grey';
              break;
            default:
              break;
          }
      
          absences[dateString] = absence;
        });
      
        setAttendanceData(absences);
      } else {
        setAttendanceData({});
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setAttendanceData({});
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>फीस प्रबंधन</Text>

        <View style={styles.feesContainer}>
          <Text style={styles.sectionHeading}>फीस</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>कुल फीस:</Text>
            <Text style={styles.infoValue}>₹{feesData.totalFees}</Text>
          </View>
          {/* <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>चुकाई गई राशि:</Text>
            <Text style={styles.infoValue}>₹{feesData.paidAmount}</Text>
          </View> */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>शेष राशि:</Text>
            <Text style={styles.infoValue}>₹{feesData.remainingAmount}</Text>
          </View>
        </View>

        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceHeading}>उपस्थिति</Text>
          <Calendar
            current={currentDate.toISOString().split('T')[0]}
            markingType={'custom'}
            markedDates={attendanceData}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            enableSwipeMonths={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f4f8',
    paddingVertical: height * 0.02,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  heading: {
    marginBottom: height * 0.03,
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#6495ed',
  },
  feesContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: height * 0.03,
    width: '100%',
  },
  sectionHeading: {
    fontSize: width * 0.06,
    marginBottom: height * 0.02,
    fontWeight: 'bold',
    color: '#6495ed',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
  },
  infoLabel: {
    color: '#555',
    fontSize: width * 0.045,
  },
  infoValue: {
    color: '#333',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  attendanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%',
  },
  attendanceHeading: {
    fontSize: width * 0.06,
    marginBottom: height * 0.02,
    fontWeight: 'bold',
    color: '#6495ed',
  },
  yearSelectorButton: {
    fontSize: width * 0.05,
    color: '#6495ed',
    marginBottom: 10,
    borderColor: '#6495ed',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  yearItem: {
    paddingVertical: 10,
    fontSize: width * 0.05,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    fontSize: width * 0.05,
    color: '#6495ed',
    textAlign: 'center',
  },
});

export default FeesManagementScreen;
