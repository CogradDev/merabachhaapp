import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Bell from '../src/svg/Bell';

const ProgressReportScreen = ({navigation}) => {
  // Sample data for the child's information
  const childInfo = {
    name: 'आर्या कुमार',
    grade: '6',
    section: 'A',
    rollNumber: '101',
    attendance: '80%', // Example attendance value
  };

  const subjects = [
    {name: 'गणित', grade: 'A', feedback: 'अवधारणाओं की अच्छी समझ.'},
    {name: 'विज्ञान', grade: 'B', feedback: 'प्रयोगों में सुधार की जरूरत है.'},
    {name: 'इतिहास', grade: 'A+', feedback: 'क्विज़ में उत्कृष्ट प्रदर्शन.'},
    {
      name: 'अंग्रेज़ी',
      grade: 'B-',
      feedback: 'व्याकरण और शब्दावली पर ध्यान दें.',
    },
    {name: 'कला', grade: 'A', feedback: 'रचनात्मक और अभिव्यंजक कलाकृति.'},
    // Add more subjects as needed
  ];

  const handleSubjectPress = subject => {
    // Navigate to detailed progress screen for the selected subject
    navigation.navigate('SubjectDetails', {subject});
  };

  const goToFeesScreen = () => {
    navigation.navigate('fees');
  };

  const goToComplaintScreen = () => {
    navigation.navigate('complaint');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notification'); // Navigate to the NotificationScreen
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Company Logo */}
      <Image
        source={require('../src/image/cogradLogo.png')}
        style={styles.logo}
      />

      <Text style={[styles.title, { color: '#6495ed' }]}>प्रगति रिपोर्ट</Text>
      
      {/* Notification Bell Icon */}
      <TouchableOpacity
        style={styles.notificationIcon}
        onPress={handleNotificationPress}>
        <Bell size={25} color="#333" />
      </TouchableOpacity>

      </View>
      <View style={styles.childInfoContainer}>
        <Text style={styles.childInfo}>नाम: {childInfo.name}</Text>
        <Text style={styles.childInfo}>
          कक्षा: {childInfo.grade}-{childInfo.section}
        </Text>
        <Text style={styles.childInfo}>रोल नंबर: {childInfo.rollNumber}</Text>
        <Text style={styles.childInfo}>उपस्थिति: {childInfo.attendance}</Text>
      </View>

      {/* Boxes for Fees and Complaint screens */}
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, styles.complaintBox]}
          onPress={goToComplaintScreen}>
          <Text style={styles.boxText}>शिकायत</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.feesBox]}
          onPress={goToFeesScreen}>
          <Text style={styles.boxText}>शुल्क</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>विषयों में प्रगति:</Text>
      
       <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerText]}>विषय</Text>
          <Text style={[styles.tableCell, styles.headerText]}>ग्रेड</Text>
          <Text style={[styles.tableCell, styles.headerText]}>सुझाव</Text>
        </View>
        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tableRow}
            onPress={() => handleSubjectPress(subject)}>
            <Text style={styles.tableCell}>{subject.name}</Text>
            <Text style={styles.tableCell}>{subject.grade}</Text>
            <Text style={styles.tableCell}>{subject.feedback}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop : 10,
  },
  headerContainer :{
    flexDirection : "row",
    width : "100%",
    justifyContent : "space-between",
    alignItems : "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginLeft: -30,
  },
  logo: {
    width: 100,
    height: 50,
  },
  notificationIcon: {
    height : 22,
    width : 22,
    marginBottom : 10,
  },

  childInfoContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  childInfo: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333333',
  },
  sectionTitle:{
    fontSize : 20,
    fontWeight : "bold",
    marginBottom : 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 12,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#333333',
    fontSize: 16,
  },
  headerText: {
    fontWeight: 'bold',
    backgroundColor: '#6495ed',
    color: '#fff',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom : 20,
  },
  box: {
    width: '48%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  feesBox: {
    backgroundColor: '#6495ed',
  },
  complaintBox: {
    backgroundColor: '#ff6347',
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProgressReportScreen;
