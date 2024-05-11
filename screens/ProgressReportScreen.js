import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Bell from '../src/svg/Bell';

const { width } = Dimensions.get('window');

const ProgressReportScreen = ({ navigation }) => {
  const childInfo = {
    name: 'आर्या कुमार',
    grade: '6',
    section: 'A',
    rollNumber: '101',
    attendance: '80%', 
  };

  const subjects = [
    { name: 'गणित', grade: 'A', feedback: 'अवधारणाओं की अच्छी समझ.' },
    { name: 'विज्ञान', grade: 'B', feedback: 'प्रयोगों में सुधार की जरूरत है.' },
    { name: 'इतिहास', grade: 'A+', feedback: 'क्विज़ में उत्कृष्ट प्रदर्शन.' },
    { name: 'अंग्रेज़ी', grade: 'B-', feedback: 'व्याकरण और शब्दावली पर ध्यान दें.' },
    { name: 'कला', grade: 'A', feedback: 'रचनात्मक और अभिव्यंजक कलाकृति.' },
  ];

  const handleSubjectPress = subject => {
    navigation.navigate('SubjectDetails', { subject });
  };

  const goToFeesScreen = () => {
    navigation.navigate('fees');
  };

  const goToComplaintScreen = () => {
    navigation.navigate('complaint');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notification'); 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../src/image/cogradLogo.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: '#6495ed' }]}>प्रगति रिपोर्ट</Text>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={handleNotificationPress}>
          <Bell size={width * 0.05} color="#333" />
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
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.01,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: width * 0.05,
    textAlign: 'center',
    marginLeft: -width * 0.2,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.2,
  },
  notificationIcon: {
    height: width * 0.06,
    width: width * 0.06,
    marginBottom: width * 0.05,
  },
  childInfoContainer: {
    marginBottom: width * 0.02,
    padding: width * 0.035,
    backgroundColor: '#ffffff',
    borderRadius: width * 0.02,
    elevation: 3,
  },
  childInfo: {
    fontSize: width * 0.04,
    marginBottom: width * 0.01,
    color: '#333333',
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: width * 0.02,
  },
  table: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: width * 0.02,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: width * 0.04,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: width * 0.025,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.03,
    color: '#333333',
    fontSize: width * 0.04,
  },
  headerText: {
    fontWeight: 'bold',
    backgroundColor: '#6495ed',
    color: '#fff',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * 0.04,
    marginBottom: width * 0.04,
  },
  box: {
    width: '48%',
    height: width * 0.2,
    borderRadius: width * 0.02,
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
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProgressReportScreen;