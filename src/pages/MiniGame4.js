import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, Image, Animated, Dimensions, PanResponder } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import ScoreMiniGame4 from './ScoreMiniGame4';

const MiniGame4 = ({ navigation }) => {
  const [progress] = useState(new Animated.Value(1));
  const [showOneBall, setShowOneBall] = useState(0);
  const [correctCount, setCorrectCount] = useState(0); 
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [showGreenTick, setShowGreenTick] = useState(false);
  const [showRedX, setShowRedX] = useState(false);

  // Capture the dimensions once when the component mounts
  const [screenDimensions, setScreenDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const guideSlides = [
    {
      image: require('../../assets/images/guide1.png'),
      text: 'Tap the screen when you see one dot as quick as you can with two fingers.',
    },
    {
      image: require('../../assets/images/guide2.png'),
      text: 'Do NOT tap the screen when you see two dots.',
    },
  ];

  // PanResponder for detecting two-finger taps
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt) => evt.nativeEvent.touches.length === 2,
    onPanResponderGrant: (evt) => {
      if (evt.nativeEvent.touches.length === 2) {
        if (showOneBall === 1) {
          setCorrectCount((prevCount) => prevCount + 1);
          setShowGreenTick(true);
          setTimeout(() => setShowGreenTick(false), 500);
        } else if (showOneBall === 0) {
          setIncorrectCount((prevCount) => prevCount + 1);
          setShowRedX(true);
          setTimeout(() => setShowRedX(false), 500);
        }
      }
    },
  });

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    if (!showGuide) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        setTimeTaken(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setTimerInterval(interval);

      const animation = Animated.timing(progress, {
        toValue: 0,
        duration: 30000,
        useNativeDriver: false,
      });

      animation.start();

      const listenerId = progress.addListener(({ value }) => {
        if (value === 0) {
          clearInterval(interval);
          setShowScore(true);
        }
      });

      return () => {
        clearInterval(interval);
        animation.stop();
        progress.removeListener(listenerId);
      };
    }
  }, [progress, showGuide]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showGuide) {
        const newShowOneBall = Math.round(Math.random());
        setShowOneBall(newShowOneBall);

        setTimeout(() => {
          setShowOneBall(2);
        }, 1000);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [showGuide]);

  const handleNextSlide = () => {
    if (currentSlide < guideSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowGuide(false);
    }
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Guide Modal */}
      <Modal visible={showGuide} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={[styles.modalContainer, { width: screenDimensions.width * 0.6, height: screenDimensions.height * 0.6 }]}>
            <View style={styles.header}>
              <Text style={[styles.headerText, { fontSize: screenDimensions.width * 0.02 }]}>
                Go No Go Test Guide
              </Text>
            </View>

            <View style={[styles.slideContent, { paddingHorizontal: screenDimensions.width * 0.03 }]}>
              <Image source={guideSlides[currentSlide].image} style={styles.guideImage} />
              <Text style={[styles.guideText, { fontSize: screenDimensions.width * 0.015 }]}>
                {guideSlides[currentSlide].text}
              </Text>
            </View>

            <View style={styles.dotsContainer}>
              {guideSlides.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, { backgroundColor: currentSlide === index ? 'orange' : 'lightgrey' }]}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.startButton} onPress={handleNextSlide}>
              <Text style={[styles.startButtonText, { fontSize: screenDimensions.width * 0.015 }]}>
                {currentSlide < guideSlides.length - 1 ? 'Next' : 'Start'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!showScore && !showGuide && (
        <View style={styles.container}>
          <View style={styles.initialBar}>
            <Animated.View
              style={[
                styles.bar,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>

          {showOneBall === 1 && (
            <View style={styles.circleContainer}>
              <View style={styles.circle}></View>
            </View>
          )}

          {showOneBall === 0 && (
            <>
              <View style={[styles.circleContainer, styles.gapTen]}>
                <View style={styles.circle}></View>
                <View style={styles.circle}></View>
              </View>
            </>
          )}

          {showGreenTick && (
            <View style={styles.feedbackContainer}>
              <Text style={styles.greenTick}>✔</Text>
            </View>
          )}
          {showRedX && (
            <View style={styles.feedbackContainer}>
              <Text style={styles.redX}>✘</Text>
            </View>
          )}
        </View>
      )}

      {showScore && (
        <ScoreMiniGame4
          navigation={navigation}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          timeTaken={timeTaken}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialBar: {
    width: '95%',
    backgroundColor: 'grey',
    position: 'absolute',
    top: 10,
    left: 5,
  },
  bar: {
    position: 'relative',
    width: '100%',
    height: 20,
    backgroundColor: 'blue',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  gapTen: {
    gap: 10,
  },
  circle: {
    backgroundColor: 'blue',
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  feedbackContainer: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenTick: {
    fontSize: 100,
    color: 'green',
    fontWeight: 'bold',
  },
  redX: {
    fontSize: 100,
    color: 'red',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  slideContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '50%',
  },
  guideImage: {
    width: '35%',
    height: '90%',
    resizeMode: 'contain',
    borderRadius: 20,
    overflow: 'hidden',
  },
  guideText: {
    textAlign: 'left',
    paddingLeft: 20,
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  startButton: {
    backgroundColor: 'orange',
    width: '60%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MiniGame4;
