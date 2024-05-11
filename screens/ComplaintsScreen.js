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

const {width} = Dimensions.get('window');

const ComplaintsScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [active, setActive] = useState(null);
  const [complaintStatus, setComplaintStatus] = useState('समाधान नहीं मिला');
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedFileName, setSubmittedFileName] = useState('');

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
  const generateAudioName = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `audio-${year}${month}${day}-${hours}${minutes}${seconds}`;
  };

  // Function to start recording audio
  const startRecording = async () => {
    const fileName = generateAudioName() + '.aac';
    const filePath = RNFS.DocumentDirectoryPath + '/' + fileName;
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVModeIOS: AVModeIOSOption.measurement,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
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

  // Function to submit a complaint
  const submitComplaint = () => {
    const fileName = generateAudioName() + '.aac';
    const newComplaint = {
      id: recordings.length + 1,
      name: fileName,
      path: audioPath,
      status: complaintStatus,
    };
    setRecordings([newComplaint, ...recordings]);
    setSubmittedFileName(fileName); // Set the submitted file name directly
    setModalVisible(false);
    setAudioPath('');
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

  // Function to render each recording item in the list
  const renderRecordingItem = ({item}) => (
    <TouchableOpacity
      style={styles.recordingItem}
      onPress={() => playAudio(item.path)}>
      <Text style={styles.recordingName}>{item.name}</Text>
      <Text style={styles.recordingDate}>{item.date}</Text>
      <Text style={styles.recordingStatus}>{item.status}</Text>
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
            <Stop size={30} color="red" />
            <Text style={styles.buttonText}>
              रिकॉर्डिंग रोकने के लिए टैप करें
            </Text>
          </>
        ) : (
          <>
            <MicroPhoneAlt size={30} color="black" />
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
              <Pause size={30} color="black" />
            ) : (
              <Play size={30} color="black" />
            )}
          </TouchableOpacity>
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

      {recordings.length > 0 && (
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>दर्ज की हुई शिकायते</Text>
        </View>
      )}

      <FlatList
        data={recordings}
        renderItem={renderRecordingItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subHeadingContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  button: {
    marginVertical: 140,
    padding: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    height: 180,
    width: 180,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FF5733',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
    width: 140,
  },

  playbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  controlText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
  playButton: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
    height: 80,
    width: 80,
  },
  recordingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%',
  },
  recordingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  recordingDate: {
    fontSize: 14,
    color: '#666666',
  },
  recordingStatus: {
    fontSize: 14,
    color: '#FF5733',
    fontWeight: 'bold',
  },
  submittedFileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
  },
});

export default ComplaintsScreen;
