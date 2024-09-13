import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Score from './Score';

const MiniGame4Right = ({ navigation }) => {
  const [progress] = useState(new Animated.Value(1));
  const [showOneBall, setShowOneBall] = useState(0);
  const [score, setScore] = useState(0);
  const [touchable1Pressed, setTouchable1Pressed] = useState(false);
  const [touchable2Pressed, setTouchable2Pressed] = useState(false);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false,
    });

    animation.start();

    const listenerId = progress.addListener(({ value }) => {
      if (value === 0) {
        setShowScore(true);
      }
    });

    return () => {
      animation.stop();
      progress.removeListener(listenerId);
    };
  }, []);

  useEffect(() => {
    // Lock the screen orientation to landscape
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
        // Unlock all orientations when the component unmounts
        ScreenOrientation.unlockAsync();
    };
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newShowOneBall = Math.round(Math.random());
      setShowOneBall(newShowOneBall);
      setTimeout(() => {
        setShowOneBall(2);
      }, 1000);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleCirclePress = () => {
    if (showOneBall === 1 && touchable1Pressed && touchable2Pressed) {
      setScore(score + 50);
      setTimeout(() => {
        setTouchable1Pressed(false);
        setTouchable2Pressed(false);
      }, 500);
    }
  };

  const handleNotPress = () => {
    setScore(score - 25);
  };

  return (
    <>
      {!showScore &&
        <View style={styles.container}>
          <View style={styles.initialBar}>
            <Animated.View style={[styles.bar, {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              })
            }]}
            />
          </View>
          {showOneBall === 1 &&
            <View style={styles.circleContainer}>
              <TouchableOpacity style={{ height: '100%', width: '45%' }}
                onPress={() => { setTouchable1Pressed(true); handleCirclePress(); }}
              >
              </TouchableOpacity>
              <View style={styles.circle}></View>
              <TouchableOpacity style={{ height: '100%', width: '55%' }}
                onPress={() => { setTouchable2Pressed(true); handleCirclePress(); }}
              >
              </TouchableOpacity>
            </View>
          }

          {showOneBall === 0 &&
            <>
              <TouchableOpacity style={{
                height: '100%', width: '100%', position: 'absolute', top: 0, left: 0,
              }}
                onPress={handleNotPress}
              >
              </TouchableOpacity>
              <View style={[styles.circleContainer, styles.gapTen]}>
                <TouchableOpacity style={styles.circle} onPress={handleNotPress}></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={handleNotPress}></TouchableOpacity>
              </View>
            </>
          }
        </View>
      }

      {showScore &&
        <Score navigation={navigation} score={score} />
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  initialBar: {
    width: '95%',
    backgroundColor: 'grey',
    position: "absolute",
    top: 10,
    left: 5
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
    gap: 10
  },
  circle: {
    backgroundColor: 'blue',
    borderRadius: 50,
    height: 100,
    width: 100
  }
})

export default MiniGame4Right;
