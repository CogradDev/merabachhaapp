import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import apiList from '../api/apiList';

const { width } = Dimensions.get('window');

const ProgressReportScreen = ({ route }) => {
  const studentId = route.params?.studentId;
  const [progressReport, setProgressReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch progress report data from backend
  const fetchProgressReport = async () => {
    const progressReportUrl = apiList.progressReport(studentId);

    try {
      // Fetch progress report data
      const response = await fetch(progressReportUrl);
      const data = await response.json();
      if (data && data.exams && data.exams.length > 0) {
        setProgressReport(data.exams[0].subjects);
      } else {
        setProgressReport([]);
      }
    } catch (error) {
      console.error('Error fetching progress report:', error);
      setError('Error fetching progress report.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressReport();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>प्रगति रिपोर्ट</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerText]}>विषय</Text>
          <Text style={[styles.tableCell, styles.headerText]}>प्राप्त अंक</Text>
          <Text style={[styles.tableCell, styles.headerText]}>कुल अंक</Text>
        </View>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : progressReport.length > 0 ? (
          progressReport.map((subject, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{subject.subjectName}</Text>
              <Text style={styles.tableCell}>{subject.marksObtain}</Text>
              <Text style={styles.tableCell}>{subject.totalMarks}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>कोई प्रगति रिपोर्ट उपलब्ध नहीं है.</Text>
        )}
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
  loadingText: {
    textAlign: 'center',
    paddingVertical: width * 0.05,
    fontSize: width * 0.05,
    color: '#333333',
  },
  errorText: {
    textAlign: 'center',
    paddingVertical: width * 0.05,
    fontSize: width * 0.05,
    color: '#FF0000',
  },
  noDataText: {
    textAlign: 'center',
    paddingVertical: width * 0.05,
    fontSize: width * 0.05,
    color: '#333333',
  },
});

export default ProgressReportScreen;
