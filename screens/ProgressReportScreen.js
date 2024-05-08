import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const ProgressReportScreen = ({ navigation }) => {
  const { t } = useTranslation();

  // Sample data for the child's information
  const childInfo = {
    name: 'आर्या कुमार',
    grade: '6',
    section: 'A',
    rollNumber: '101',
    attendance: '80%', // Example attendance value
  };

  const subjects = [
    { name: 'गणित', grade: 'A', feedback: 'अवधारणाओं की अच्छी समझ.' },
    { name: 'विज्ञान', grade: 'B', feedback: 'प्रयोगों में सुधार की जरूरत है.' },
    { name: 'इतिहास', grade: 'A+', feedback: 'क्विज़ में उत्कृष्ट प्रदर्शन.' },
    { name: 'अंग्रेज़ी', grade: 'B-', feedback: 'व्याकरण और शब्दावली पर ध्यान दें.' },
    { name: 'कला', grade: 'A', feedback: 'रचनात्मक और अभिव्यंजक कलाकृति.' },
    // Add more subjects as needed
  ];

  const handleSubjectPress = (subject) => {
    // Navigate to detailed progress screen for the selected subject
    navigation.navigate('SubjectDetails', { subject });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>प्रगति रिपोर्ट</Text>

      <View style={styles.childInfoContainer}>
        <Text style={styles.childInfo}>नाम: {childInfo.name}</Text>
        <Text style={styles.childInfo}>कक्षा: {childInfo.grade}-{childInfo.section}</Text>
        <Text style={styles.childInfo}>रोल नंबर: {childInfo.rollNumber}</Text>
        <Text style={styles.childInfo}>उपस्थिति: {childInfo.attendance}</Text>
      </View>
      <Text style={styles.sectionTitle}>विषयों में प्रगति:</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerText]}>विषय</Text>
          <Text style={[styles.tableCell, styles.headerText]}>ग्रेड</Text>
          <Text style={[styles.tableCell, styles.headerText]}>सुझाव</Text>
        </View>
        {subjects.map((subject, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{subject.name}</Text>
            <Text style={styles.tableCell}>{subject.grade}</Text>
            <Text style={styles.tableCell}>{subject.feedback}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Color added
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333333',
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
});

export default ProgressReportScreen;
