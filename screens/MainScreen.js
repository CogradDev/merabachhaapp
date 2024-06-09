import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Bell from '../src/svg/Bell';
import complaintPic from '../src/image/Classroom-bro.png';
import feesPic from '../src/image/MoneyManage.png';
import progressPic from '../src/image/Progress.png';
import apiList from '../api/apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const MainScreen = ({navigation, route}) => {
  const parentData = route.params?.parentData;
  const [selectedChild, setSelectedChild] = useState(
    parentData.students[0].name,
  ); // Default selected child
  const [selectedChildInfo, setSelectedChildInfo] = useState(null);
  const [parentId, setParentId] = useState(parentData._id);
  const [childrenList, setChildrenList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChildrenInfo = async () => {
    try {
      const childrenPromises = parentData.students.map(student =>
        fetch(apiList.getStudentInfo(student.studentId)).then(response =>
          response.json(),
        ),
      );

      const childrenData = await Promise.all(childrenPromises);

      const formattedChildrenData = childrenData.map(child => ({
        studentId: child._id,
        name: child.name,
        school: child.schoolName.schoolName,
        schoolId: child.schoolName._id,
        grade: child.className.className,
      }));

      setChildrenList(formattedChildrenData);
      setSelectedChildInfo(formattedChildrenData[0]);
      setSelectedChild(formattedChildrenData[0].name);
    } catch (error) {
      console.error('Error fetching children list:', error);
      alert('एक त्रुटि पाई गई। कृपया बाद में पुन: प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildrenInfo();
  }, []);

  useEffect(() => {
    const childInfo = childrenList.find(child => child.name === selectedChild);
    setSelectedChildInfo(childInfo);
  }, [selectedChild, childrenList]);

  const goToFeesScreen = () => {
    const selectedChildData = childrenList.find(
      child => child.name === selectedChild,
    );
    navigation.navigate('fees', {
      parentId: parentId,
      studentId: selectedChildData.studentId,
    });
  };

  const goToComplaintScreen = () => {
    const selectedChildData = childrenList.find(
      child => child.name === selectedChild,
    );
    navigation.navigate('complaint', {
      student: selectedChildData,
      parentId: parentId,
    });
  };

  const goToProgressReportScreen = () => {
    const selectedChildData = childrenList.find(
      child => child.name === selectedChild,
    );
    navigation.navigate('progress', {
      studentId: selectedChildData.studentId,
    });
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notification', {parentId: parentId});
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {childrenList.length > 1 && (
          <SelectDropdown
            data={childrenList.map(child => ({
              label: child.name,
              value: child,
            }))}
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
                key={index}
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  ...(item.label === 'अन्य बच्चा' && {
                    opacity: 0.5,
                    backgroundColor: '#f5f5f5',
                  }),
                }}
                onPress={() =>
                  item.label !== 'अन्य बच्चा' && setSelectedChild(item.label)
                }>
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
          <Text style={styles.childInfo}>
            स्कूल: {selectedChildInfo.school}
          </Text>
          <Text style={styles.childInfo}>कक्षा: {selectedChildInfo.grade}</Text>
        </View>
      )}

      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, styles.complaintBox]}
          onPress={goToComplaintScreen}>
          <Image source={complaintPic} style={styles.boxImage} />
          <Text style={styles.boxText}>शिकायत</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.feesBox]}
          onPress={goToFeesScreen}>
          <Text style={styles.boxText}>शुल्क & उपस्थिति</Text>
          <Image source={feesPic} style={styles.boxImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.progressReport]}
          onPress={goToProgressReportScreen}>
          <Image source={progressPic} style={styles.boxImage} />
          <Text style={styles.boxText}>प्रगति रिपोर्ट</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.logoutBox]} onPress={handleLogout}>
          <Text style={styles.logoutText}>लॉग आउट</Text>
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
    backgroundColor: '#f7f8fa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: width * 0.02,
  },
  dropdownButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: width * 0.02,
    padding: width * 0.03,
    backgroundColor: '#fff',
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: width * 0.02,
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
    height: width * 0.4,
    borderRadius: width * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 3,
    marginBottom: width * 0.05,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: width * 0.02,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.03,
    borderWidth: 2,
  },
  boxImage: {
    width: '35%',
    height: '70%',
    resizeMode: 'contain',
  },
  feesBox: {
    borderColor: '#007bff',
  },
  complaintBox: {
    borderColor: '#dc3545',
  },
  progressReport: {
    borderColor: '#28a745',
  },
  logoutBox: {
    borderColor: '#dc3545',
    //backgroundColor: '#f8d7da',
    borderWidth: 2,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#dc3545',
    textAlign: 'center',
  },

  boxText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  childInfoContainer: {
    marginBottom: width * 0.02,
    padding: width * 0.05,
    backgroundColor: '#ffffff',
    borderRadius: width * 0.02,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: width * 0.02,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  childInfo: {
    fontSize: width * 0.045,
    marginBottom: width * 0.01,
    color: '#333333',
    fontWeight: '500',
    lineHeight: width * 0.06,
  },
});

export default MainScreen;
