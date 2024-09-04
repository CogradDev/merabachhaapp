import React, {useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const ProgressBar = ({statusText}) => {
  //const [status, setStatus] = useState(0);
  let status = 0;
  const statusList = [
    'समीक्षा के अंतर्गत',
    'प्राचार्य द्वारा समीक्षा की गई',
    'कक्षा शिक्षक द्वारा समीक्षा की गई',
    'शिकायत का समाधान हो गया',
  ];

  if (statusText === 'UNRESOLVED') {
    status = 0;
  } else if (statusText === 'status1') {
    status = 1;
  } else if (statusText === 'status2') {
    status = 2;
  } else {
    status = 3;
  }

  const getProgressColors = () => {
    switch (status) {
      case 0:
        return ['#6495ED', '#e2e2e2'];
      case 1:
        return ['#6495ED', '#e2e2e2'];
      case 2:
        return ['#6495ED', '#e2e2e2'];
      case 3:
        return ['#6495ED', '#e2e2e2'];
      default:
        return ['#6495ED', '#e2e2e2'];
    }
  };

  const renderCircles = () => {
    const circles = [];
    for (let i = 0; i < 4; i++) {
      circles.push(
        <View
          key={i}
          style={[
            styles.circle,
            {backgroundColor: getProgressColors()[i <= status ? 0 : 1]},
          ]}
        />,
      );
    }
    return circles;
  };

  return (
    <View style={styles.progressBarContainer}>
      <LinearGradient
        colors={getProgressColors()}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.progressBackground}>
        {renderCircles()}
      </LinearGradient>
      <View style={styles.labelContainer}>
        {statusList.map((label, i) => (
          <Text
            key={i}
            style={[
              styles.statusText,
              status >= i ? styles.activeLabelColor : null,
            ]}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  progressBackground: {
    flexDirection: 'row',
    height: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  circle: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  statusText: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    textAlign: 'right',
    width: '30%',
    textAlign: 'center',
    paddingRight: 10,
  },
  activeLabelColor: {
    color: '#6495ED',
  },
});

export default ProgressBar;
