import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import MicroPhoneAlt from '../src/svg/MicroPhoneAlt';
import Stop from '../src/svg/Stop';
import Play from '../src/svg/Play';
import Pause from '../src/svg/Pause';
import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVModeIOSOption,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import ProgressBar from '../Components/ProgressBar';
import apiList from '../api/apiList';

const {width} = Dimensions.get('window');

const ComplaintsScreen = ({route}) => {
  const student = route.params?.student;
  const parentId = route.params?.parentId;
  let complaintNumber;
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [active, setActive] = useState(null);
  const [complaintStatus, setComplaintStatus] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedFileName, setSubmittedFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize audioRecorderPlayer using useRef
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());

  useEffect(() => {
    // Check and request audio recording permission
    const requestAudioRecordingPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permission to use microphone',
            message: 'Please grant permission to record audio',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Audio recording permission granted');
        } else {
          console.log('Audio recording permission denied');
        }
      } catch (error) {
        console.log('Error requesting permission:', error);
      }
    };

    requestAudioRecordingPermission();
  }, []);

  // Function to generate audio file name
  const generateAudioName = (studentName, complaintNumber) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${studentName}-complaint${complaintNumber}-${year}${month}${day}-${hours}${minutes}${seconds}.mp3`;
  };

  // Function to start recording audio
  const startRecording = async () => {
    const studentName = student.name;
    if (recordings && recordings.length > 0) {
      complaintNumber = recordings.length + 1;
    } else {
      complaintNumber = 1;
    }
    const fileName = generateAudioName(studentName, complaintNumber) + '.mp3';
    const filePath = RNFS.DocumentDirectoryPath + '/' + fileName;
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.MP3,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVModeIOS: AVModeIOSOption.measurement,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.mp3,
    };

    try {
      const uri = await audioRecorderPlayer.current.startRecorder(
        filePath,
        audioSet,
      );
      setIsRecording(true);
      setAudioPath(uri);
    } catch (error) {
      console.log('Error starting recording:', error);
    }
  };

  // Function to stop recording audio
  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.current.stopRecorder();
      setIsRecording(false);
      setModalVisible(true);
      setIsPlaying(false);
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };

  // Function to play audio
  const playAudio = async path => {
    try {
      if (active === path) {
        if (isPlaying) {
          // Pause the player if it's playing
          await audioRecorderPlayer.current.pausePlayer();
          setIsPlaying(false);
        } else {
          // Resume the player from the beginning if it's paused
          await audioRecorderPlayer.current.startPlayer(path);
          setIsPlaying(true);
        }
      } else {
        if (isPlaying) {
          // Stop the player if it's playing a different audio
          await audioRecorderPlayer.current.stopPlayer();
        }
        setActive(path);
        setIsPlaying(true);

        audioRecorderPlayer.current.addPlayBackListener(async data => {
          if (data.current_position === data.duration) {
            setIsPlaying(false);
            setActive(null);
          }
        });

        // Start playing the new audio from the beginning
        await audioRecorderPlayer.current.startPlayer(path);
      }
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const submitComplaint = async () => {
    const studentName = student.name;
    if (recordings && recordings.length > 0) {
      complaintNumber = recordings.length + 1;
    } else {
      complaintNumber = 1;
    }
    const fileName = generateAudioName(studentName, complaintNumber);

    // Create FormData object to send the complaint
    const formData = new FormData();
    formData.append('role', 'PARENT');
    formData.append('message', studentName);
    formData.append('studentId', student.studentId);
    formData.append('id', parentId);
    formData.append('schoolId', student.schoolId);
    formData.append('audio', {
      uri: audioPath,
      type: 'audio/mp3',
      name: fileName,
    });

    try {
      setIsSubmitting(true); // Show loader while submitting
      const response = await fetch(apiList.sendComplaint, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        setModalVisible(false);
        setAudioPath('');
        fetchComplaints(); // Fetch complaints after submitting a new one
      } else {
        const errorData = await response.json();
        console.error(
          'Failed to submit complaint:',
          errorData.message || response.statusText,
        );
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false); // Hide loader after submission
    }
  };

  // Function to cancel recording
  const cancelRecording = async () => {
    try {
      if (isRecording) {
        await audioRecorderPlayer.current.stopRecorder();
      }
      setAudioPath(''); // Clear audioPath on cancel
      setModalVisible(false);
      setIsPlaying(false);
    } catch (error) {
      console.log('Error canceling recording:', error);
    }
  };

  // Function to retrieve complaints raised by the parent
  const fetchComplaints = async () => {
    setIsLoading(true); // Show loader while fetching complaints
    try {
      const response = await fetch(apiList.getComplaints(parentId));
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const sortedData = data.sort((a, b) => b.date - a.date);
        setRecordings(sortedData);
      } else {
        console.error('Failed to fetch complaints:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setIsLoading(false); // Hide loader after fetching complaints
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Function to render each recording item in the list
  const renderRecordingItem = ({item}) => (
    <TouchableOpacity
      style={styles.recordingItem}
      onPress={() => playAudio(item.audio)}>
      <View style={styles.recordingDetails}>
        <Text style={styles.recordingName}>{item.message + `-शिकायत`}</Text>
        <Text style={styles.recordingDate}>{formatDate(item.date)}</Text>
      </View>
      <View style={styles.statusContainer}>
        <ProgressBar statusText={item.status} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>शिकायत दर्ज करे</Text>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        style={[styles.button, isRecording && styles.activeButton]}>
        {isRecording ? (
          <>
            <Stop size={width * 0.1} color="red" />
            <Text style={styles.buttonText}>
              रिकॉर्डिंग रोकने के लिए टैप करें
            </Text>
          </>
        ) : (
          <>
            <MicroPhoneAlt size={width * 0.1} color="black" />
            <Text style={styles.buttonText}>
              आवाज रिकॉर्ड करने के लिए टैप करें
            </Text>
          </>
        )}
      </TouchableOpacity>

      {!isRecording && audioPath !== '' && (
        <View style={styles.playbackContainer}>
          <TouchableOpacity
            onPress={() => playAudio(audioPath)}
            style={styles.playButton}>
            {isPlaying ? (
              <Pause size={width * 0.08} color="black" />
            ) : (
              <Play size={width * 0.08} color="black" />
            )}
          </TouchableOpacity>
          {isSubmitting}
          <View style={styles.audioControls}>
            <TouchableOpacity onPress={cancelRecording}>
              <Text style={styles.controlText}>रद्द करे</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitComplaint}>
              <Text style={styles.controlText}>जमा करें</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#6495ed" />
      ) : (
        recordings &&
        recordings.length > 0 && (
          <>
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>दर्ज की हुई शिकायते</Text>
            </View>
            <FlatList
              data={recordings}
              renderItem={renderRecordingItem}
              keyExtractor={item => item._id}
            />
          </>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: width * 0.05,
  },
  heading: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: width * 0.05,
    color: '#6495ed',
  },
  subHeadingContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: width * 0.04,
    marginTop: width * 0.05,
    paddingBottom: width * 0.03,
  },
  subHeading: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333333',
  },
  button: {
    marginVertical: width * 0.2,
    padding: width * 0.08,
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    height: width * 0.45,
    width: width * 0.45,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FF5733',
  },
  buttonText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginTop: width * 0.13,
    textAlign: 'center',
    width: width * 0.35,
  },
  playbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.05,
    width: '100%',
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginVertical: width * 0.05,
  },
  controlText: {
    fontSize: width * 0.036,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.03,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
  playButton: {
    marginVertical: width * 0.03,
    padding: width * 0.06,
    backgroundColor: '#F0F0F0',
    borderRadius: width * 0.1,
    height: width * 0.16,
    width: width * 0.16,
  },
  recordingItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
    marginBottom: width * 0.05,
    borderWidth: 2,
    borderColor: '#6495ed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    width: width * 0.9,
  },
  recordingDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.05,
  },
  recordingName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: width * 0.01,
  },
  recordingDate: {
    fontSize: width * 0.03,
    color: '#666666',
  },
  statusContainer: {
    marginTop: width * 0.03,
  },
});

export default ComplaintsScreen;
