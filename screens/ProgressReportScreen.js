import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import apiList from '../api/apiList';

const { width } = Dimensions.get('window');

const ProgressReportScreen = ({ route }) => {
  const studentId = route.params?.studentId;
  const [progressReport, setProgressReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSections, setActiveSections] = useState([]);

  // Function to fetch progress report data from backend
  const fetchProgressReport = async () => {
    const progressReportUrl = apiList.progressReport(studentId);

    try {
      // Fetch progress report data
      const response = await fetch(progressReportUrl);
      const data = await response.json();

      console.log('student report', data);
      if (data.exams) {
        const exams = data.exams.map(exam => ({
          title: exam.examName.examName,
          evaluationDate: exam.evaluationDate,
          details: exam.subjects.map(subject => ({
            subTitle: subject.subjectName,
            marksObtain: subject.marksObtain,
            totalMarks: subject.totalMarks,
          })),
          readingHE: exam.readingHE,
          writingHE: exam.writingHE,
          tables1To20: exam.tables1To20,
          basicMathematics: exam.basicMathematics,
          talkingInBasicEnglish: exam.talkingInBasicEnglish,
          talkingInBasicHindi: exam.talkingInBasicHindi,
          gk500Questions: exam.gk500Questions,
          hobby: exam.hobby,
          sports: exam.sports,
          culturalActivities: exam.culturalActivities,
          moralBehavior: exam.moralBehavior,
          specialQuality: exam.specialQuality,
          comments: exam.comments,
        }));
        setProgressReport(exams);
      } else {
        setError(data.message);
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

  const toggleSection = index => {
    setActiveSections(prevSections =>
      prevSections.includes(index)
        ? prevSections.filter(sectionIndex => sectionIndex !== index)
        : [...prevSections, index],
    );
  };

  const renderTableRow = (label, value) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellLabel}>{label}</Text>
      <Text style={styles.tableCellValue}>{value}</Text>
    </View>
  );

  const renderTable = details => (
    <View style={styles.tableContainer}>
      {details.map((detail, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>{detail.subTitle}</Text>
          <Text style={styles.tableCellValue}>
            {detail.marksObtain}/{detail.totalMarks}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>प्रगति रिपोर्ट</Text>
      </View>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.reportContainer}>
          {progressReport.map((item, index) => (
            <View key={index} style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(index)}>
                <Text style={styles.sectionTitle}>{item.title}</Text>
              </TouchableOpacity>
              <Collapsible collapsed={!activeSections.includes(index)}>
                <View style={styles.sectionContent}>
                  {item.evaluationDate && (
                    <Text style={styles.sectionText}>
                      मूल्यांकन तिथि: {item.evaluationDate}
                    </Text>
                  )}
                  {item.details && item.details.length > 0 && (
                    <View>
                      <Text style={styles.sectionSubTitle}>विषय विवरण:</Text>
                      {renderTable(item.details)}
                    </View>
                  )}
                  {item.readingHE && (
                    <Text style={styles.sectionText}>
                      पढ़ाई (हिंदी): {item.readingHE}
                    </Text>
                  )}
                  {item.writingHE && (
                    <Text style={styles.sectionText}>
                      लेखन (हिंदी): {item.writingHE}
                    </Text>
                  )}
                  {item.tables1To20 && (
                    <Text style={styles.sectionText}>
                      तालिकाएँ (1-20): {item.tables1To20}
                    </Text>
                  )}
                  {item.basicMathematics && (
                    <Text style={styles.sectionText}>
                      बुनियादी गणित: {item.basicMathematics}
                    </Text>
                  )}
                  {item.talkingInBasicEnglish && (
                    <Text style={styles.sectionText}>
                      बुनियादी अंग्रेजी बोलना: {item.talkingInBasicEnglish}
                    </Text>
                  )}
                  {item.talkingInBasicHindi && (
                    <Text style={styles.sectionText}>
                      बुनियादी हिंदी बोलना: {item.talkingInBasicHindi}
                    </Text>
                  )}
                  {item.gk500Questions && (
                    <Text style={styles.sectionText}>
                      500 सामान्य ज्ञान प्रश्न: {item.gk500Questions}
                    </Text>
                  )}
                  {item.hobby && (
                    <Text style={styles.sectionText}>शौक: {item.hobby}</Text>
                  )}
                  {item.sports && (
                    <Text style={styles.sectionText}>खेल: {item.sports}</Text>
                  )}
                  {item.culturalActivities && (
                    <Text style={styles.sectionText}>
                      सांस्कृतिक गतिविधियाँ: {item.culturalActivities}
                    </Text>
                  )}
                  {item.moralBehavior && (
                    <Text style={styles.sectionText}>
                      नैतिक व्यवहार: {item.moralBehavior}
                    </Text>
                  )}
                  {item.specialQuality && (
                    <Text style={styles.sectionText}>
                      विशेष गुण: {item.specialQuality}
                    </Text>
                  )}
                  {item.comments && (
                    <Text style={styles.sectionText}>
                      टिप्पणियाँ: {item.comments}
                    </Text>
                  )}
                </View>
              </Collapsible>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  reportContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: 'white',
    borderColor: '#e0e0e0',
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  sectionContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  tableContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCellLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    flex: 1,
  },
  tableCellValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});

export default ProgressReportScreen;
