// pages/MiniGame3.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Score from './Score';

const MiniGame3 = ({ navigation }) => {
  const symbols = ["!", "@", "#", "$", "%", "^", "&", "(", ")"];
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * symbols.length));
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  // let turns=0

  useEffect(() => {
    Orientation.lockToLandscape();
    setStartTime(Date.now());
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const submitAnswer = (index) => {
    if (!isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      setResult(index == randomIndex);
      const endTime = Date.now();
      const timeDiff = (endTime - startTime) / 1000;
      let points = 0;

      if (index === randomIndex) {
        if (timeDiff <= 1) {
          points = 100;
        } else if (timeDiff <= 2) {
          points = 50;
        } else {
          points = 25;
        }
      }
      setScore(score + points);
      setTimeout(() => {
        setResult(null);
        setIsAnswerSubmitted(false);
        setRandomIndex(Math.floor(Math.random() * symbols.length));
        setStartTime(Date.now());
      }, 1000);

      setTurns(turns + 1)
      // if(turns==3){
      //   navigation.navigate("score")
      // }

    }
  }

  return (
    <>
      {turns < 4 &&
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            {result != null &&
              <View
                style={[styles.resultContainer,
                result == true ? styles.resultContainerCorrect : styles.resultContainerInCorrect]}
              >
                <Text style={[styles.resultText, result == true ? styles.resultTextCorrect : styles.resultTextIncorrect]}>
                  {result == true ? 'Correct' : 'Incorrect'}
                </Text>
              </View>
            }
            <View style={[styles.symbolContainer, result == null ? { marginLeft: '45%' } : null]}>
              <Text style={styles.symbol}>
                {symbols[randomIndex]}
              </Text>
            </View>
          </View>

          <View style={styles.symbolsLine}>
            {symbols.map((symbol, index) => (
              <View key={index}>
                <Text style={styles.symbol}>{symbol}</Text>
                <TouchableOpacity style={styles.symbolButton}
                  onPress={() => submitAnswer(index)}
                >
                  <Text style={{ color: 'white', fontSize: 24 }}>{index + 1}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      }
      {
        turns == 4 &&
        <Score score={score} navigation={navigation} />
      }
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: '10%',
    position: 'absolute',
  },
  resultContainer: {
    width: '20%',
    borderWidth: 1,

    alignItems: 'center',
    justifyContent: 'center'
  },
  resultContainerCorrect: {
    borderColor: '#90EE90',
    backgroundColor: '#90EE90',
  },
  resultContainerInCorrect: {
    borderColor: '#FFA07A',
    backgroundColor: '#FFA07A',
  },
  resultText: {
    fontSize: 24,
  },
  resultTextCorrect: {
    color: 'green'
  },
  resultTextIncorrect: {
    color: 'red'
  },
  symbolContainer: {
    marginLeft: '25%',
    width: '10%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#89CFF0',
    padding: 10,
  },
  symbol: {
    fontSize: 32,
    textAlign: 'center'
  },
  symbolsLine: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: '5%',
    width: '100%'
  },
  symbolButton: {
    borderWidth: 1,
    borderColor: '#89CFF0',
    backgroundColor: '#89CFF0',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
})

export default MiniGame3;
