import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProgressReportScreen = ({ navigation }) => {
  const subjects = [
    { name: 'गणित', grade: 'A', feedback: 'अवधारणाओं की अच्छी समझ.' },
    { name: 'विज्ञान', grade: 'B', feedback: 'प्रयोगों में सुधार की जरूरत है.' },
    { name: 'इतिहास', grade: 'A+', feedback: 'क्विज़ में उत्कृष्ट प्रदर्शन.' },
    { name: 'अंग्रेज़ी', grade: 'B-', feedback: 'व्याकरण और शब्दावली पर ध्यान दें.' },
    { name: 'कला', grade: 'A', feedback: 'रचनात्मक और अभिव्यंजक कलाकृति.' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>प्रगति रिपोर्ट</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerText]}>विषय</Text>
          <Text style={[styles.tableCell, styles.headerText]}>ग्रेड</Text>
          <Text style={[styles.tableCell, styles.headerText]}>सुझाव</Text>
        </View>
        {subjects.map((subject, index) => (
          <TouchableOpacity key={index} style={styles.tableRow}>
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
    backgroundColor: '#F7F9FC',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: width * 0.08,
    paddingBottom: width * 0.05,
  },
  heading: {
    marginBottom: width * 0.04,
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#6495ed',
  },
  table: {
    borderWidth: 1,
    borderColor: '#D6E4EF',
    borderRadius: width * 0.04,
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.05,
    marginBottom: width * 0.1,
    elevation: 3,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D6E4EF',
    paddingVertical: width * 0.03,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.03,
    color: '#333333',
    fontSize: width * 0.048,
  },
  headerText: {
    fontWeight: 'bold',
    backgroundColor: '#2E75D0',
    color: '#FFFFFF',
    fontSize: width * 0.05,
  },
});

export default ProgressReportScreen;
