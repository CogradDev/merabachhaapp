import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Bell from '../src/svg/Bell';

const { width } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {
  const [selectedChild, setSelectedChild] = useState('आर्या कुमार'); // Default selected child
  const [selectedChildInfo, setSelectedChildInfo] = useState(null);
  const [childrenList, setChildrenList] = useState([
    'आर्या कुमार',
    'राज कुमार',
    'सोनिया देवी',
  ]); // List of children

  useEffect(() => {
    const childInfoList = {
      'आर्या कुमार': { name: 'आर्या कुमार', school: 'कुमार इंटरनेशनल स्कूल', grade: '6', section: 'A', rollNumber: '101', attendance: '80%' },
      'राज कुमार': { name: 'राज कुमार', school: 'संगमित्रा स्कूल', grade: '7', section: 'B', rollNumber: '102', attendance: '75%' },
      'सोनिया देवी': { name: 'सोनिया देवी', school: 'शान्ति स्कूल', grade: '5', section: 'A', rollNumber: '103', attendance: '85%' },
    };
    setSelectedChildInfo(childInfoList[selectedChild]);
  }, [selectedChild]);

  const goToFeesScreen = () => {
    navigation.navigate('fees');
  };

  const goToComplaintScreen = () => {
    navigation.navigate('complaint');
  };

  const goToProgressReportScreen = () => {
    navigation.navigate('progress');
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {childrenList.length > 1 && (
          <SelectDropdown
            data={childrenList.map(child => ({ label: child }))}
            onSelect={item => setSelectedChild(item.label)}
            defaultButtonText={selectedChild}
            renderButton={(selectedItem, isOpened) => (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.label) || selectedChild}
                </Text>
              </View>
            )}
            renderItem={(item, index, isSelected) => (
              <TouchableOpacity
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: '#D2D9DF' }),
                  ...(item.label === 'अन्य बच्चा' && { opacity: 0.5, backgroundColor: '#f5f5f5' }),
                }}
                onPress={() => item.label !== 'अन्य बच्चा' && setSelectedChild(item.label)}>
                <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        )}

        {/* Notification Bell Icon */}
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={handleNotificationPress}>
          <Bell size={width * 0.05} color="#333" />
        </TouchableOpacity>
      </View>

      {selectedChildInfo && (
        <View style={styles.childInfoContainer}>
          <Text style={styles.childInfo}>नाम: {selectedChildInfo.name}</Text>
          <Text style={styles.childInfo}>स्कूल: {selectedChildInfo.school}</Text>
          <Text style={styles.childInfo}>
            कक्षा: {selectedChildInfo.grade}-{selectedChildInfo.section}
          </Text>
          <Text style={styles.childInfo}>रोल नंबर: {selectedChildInfo.rollNumber}</Text>
        </View>
      )}

      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, styles.complaintBox]}
          onPress={goToComplaintScreen}>
          <Text style={styles.boxText}>शिकायत</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.feesBox]}
          onPress={goToFeesScreen}>
          <Text style={styles.boxText}>शुल्क & उपस्थिति</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.progressReport]}
          onPress={goToProgressReportScreen}>
          <Text style={styles.boxText}>प्रगति रिपोर्ट</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: width * 0.04,
    paddingRight: width * 0.07,
    marginBottom: width * 0.04,
  },
  dropdownMenuStyle: {
    width: '50%',
    marginTop: width * 0.02,
    marginLeft: width * 0.025,
    borderRadius: width * 0.02,
    elevation: 2,
    backgroundColor: '#fff',
  },
  dropdownButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6495ed', // Theme color for borders
    borderRadius: width * 0.02,
    padding: width * 0.03,
    backgroundColor: '#fff',
    width: '45%',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#333',
    fontWeight: '800',
  },
  dropdownItemStyle: {
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.025,
  },
  dropdownItemTxtStyle: {
    fontSize: width * 0.04,
    color: '#333',
  },
  notificationIcon: {
    height: width * 0.06,
    width: width * 0.06,
    marginLeft: width * 0.455,
  },
  boxContainer: {
    flexDirection: 'column',
    marginTop: width * 0.04,
    marginBottom: width * 0.04,
  },
  box: {
    height: width * 0.3,
    borderRadius: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: width * 0.02,
  },
  feesBox: {
    backgroundColor: '#6495ed',
  },
  complaintBox: {
    backgroundColor: '#ff6347',
  },
  progressReport: {
    backgroundColor: '#004d00',
  },
  boxText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#fff',
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
});

export default MainScreen;
