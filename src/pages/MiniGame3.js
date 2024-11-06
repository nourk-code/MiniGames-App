import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import ScoreMiniGame3 from './ScoreMiniGame3';

const MiniGame3 = ({ navigation }) => {
  const symbols = ["!", "@", "#", "$", "%", "^", "&", "(", ")"];
  const [randomIndex, setRandomIndex] = useState(null);
  const [lastRandomIndex, setLastRandomIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(0);
  const [details, setDetails] = useState([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [usedSymbols, setUsedSymbols] = useState([]);
  const [screenSize, setScreenSize] = useState(Dimensions.get('window')); // Store dimensions in state

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    generateNewSymbol();

    // Listen to dimension changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenSize(window);
    });

    return () => {
      ScreenOrientation.unlockAsync();
      subscription?.remove(); // Clean up event listener
    };
  }, []);

  const generateNewSymbol = () => {
    setIsAnswerSubmitted(false);
    setStartTime(Date.now());

    const availableSymbols = symbols.filter((_, index) => !usedSymbols.includes(index));
    
    if (availableSymbols.length > 0) {
      let newRandomIndex;
      do {
        newRandomIndex = Math.floor(Math.random() * availableSymbols.length);
      } while (newRandomIndex === lastRandomIndex && availableSymbols.length > 1);

      const selectedSymbol = symbols.indexOf(availableSymbols[newRandomIndex]);
      setRandomIndex(selectedSymbol);
      setLastRandomIndex(newRandomIndex);
    } else {
      console.log("All symbols used!");
    }
  };

  const submitAnswer = (index) => {
    if (!isAnswerSubmitted) {
      setIsAnswerSubmitted(true);

      const endTime = Date.now();
      const responseTime = (endTime - startTime) / 1000;

      const isCorrect = index === randomIndex;
      const points = isCorrect ? 50 : 0;

      setScore((prevScore) => prevScore + points);

      const turnDetails = {
        responseTime,
        isCorrect,
        points,
      };

      setDetails((prevDetails) => [...prevDetails, turnDetails]);

      if (isCorrect) {
        setUsedSymbols((prevUsedSymbols) => [...prevUsedSymbols, randomIndex]);
      }

      setTurns((prevTurns) => prevTurns + 1);

      if (turns < 4) {
        generateNewSymbol();
      } else {
        console.log('Game Finished: Max Turns Reached');
      }
    }
  };

  return (
    <View style={styles.container(screenSize)}>
      {turns < 5 ? (
        <>
          <View style={styles.topSection(screenSize)}>
            <View style={styles.symbolContainer(screenSize)}>
              <Text style={styles.symbol(screenSize)}>{symbols[randomIndex]}</Text>
            </View>
          </View>

          <View style={styles.symbolsLine(screenSize)}>
            {symbols.map((symbol, index) => (
              <View key={index} style={styles.symbolItem}>
                <Text style={styles.symbolButtonText(screenSize)}>{symbol}</Text>
                <TouchableOpacity
                  style={styles.symbolButton(screenSize)}
                  onPress={() => submitAnswer(index)}
                  disabled={usedSymbols.includes(index) || isAnswerSubmitted}
                >
                  <Text style={styles.buttonText(screenSize)}>{index + 1}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      ) : (
        <ScoreMiniGame3 score={score} maxScore={250} details={details} navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: (screenSize) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    padding: screenSize.width * 0.04,
  }),
  topSection: (screenSize) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenSize.height * 0.2,
  }),
  symbolContainer: (screenSize) => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#007bff',
    padding: screenSize.height * 0.02,
    width: screenSize.width * 0.2,
    elevation: 3,
  }),
  symbol: (screenSize) => ({
    fontSize: screenSize.height * 0.05,
    color: '#fff',
  }),
  symbolsLine: (screenSize) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenSize.width * 0.03,
    width: '100%',
  }),
  symbolItem: {
    alignItems: 'center',
  },
  symbolButtonText: (screenSize) => ({
    fontSize: screenSize.height * 0.03,
    marginBottom: screenSize.height * 0.005,
    color: '#333',
  }),
  symbolButton: (screenSize) => ({
    borderWidth: 2,
    borderColor: '#007bff',
    backgroundColor: '#007bff',
    borderRadius: 12,
    height: screenSize.height * 0.08,
    width: screenSize.height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  }),
  buttonText: (screenSize) => ({
    fontSize: screenSize.height * 0.025,
    color: '#fff',
    fontWeight: 'bold',
  }),
});

export default MiniGame3;
