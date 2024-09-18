import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import ScoreMiniGame3 from './ScoreMiniGame3'; // Use the new Score component

const MiniGame3 = ({ navigation }) => {
  const symbols = ["!", "@", "#", "$", "%", "^", "&", "(", ")"];
  const [randomIndex, setRandomIndex] = useState(null); // Start with null to select a symbol later
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(0);
  const [details, setDetails] = useState([]); // Store details for each turn
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [usedSymbols, setUsedSymbols] = useState([]); // Track used symbols

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    setStartTime(Date.now());
    generateNewSymbol(); // Generate the first symbol when the component mounts

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    console.log('Current game details:', details); // Log the details array to the console
  }, [details]); // This will run every time the details array updates

  const generateNewSymbol = () => {
    // Filter the available symbols excluding the used ones
    const availableSymbols = symbols.filter((_, index) => !usedSymbols.includes(index));
    if (availableSymbols.length > 0) {
      const newRandomIndex = Math.floor(Math.random() * availableSymbols.length);
      setRandomIndex(symbols.indexOf(availableSymbols[newRandomIndex]));
    } else {
      console.log("All symbols used!");
    }
  };

  const submitAnswer = (index) => {
    if (!isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      const endTime = Date.now();
      const responseTime = (endTime - startTime) / 1000; // Calculate response time in seconds
      const isCorrect = index === randomIndex;
      let points = isCorrect ? 50 : 0; // Each correct answer is 50 points, wrong answer is 0 points

      setScore((prevScore) => prevScore + points);

      // Save the turn details including response time
      const turnDetails = {
        responseTime,
        isCorrect,
        points,
      };

      // Add the current turn details to the state using functional update
      setDetails((prevDetails) => [...prevDetails, turnDetails]);

      // Add the current randomIndex to the usedSymbols array using functional update
      setUsedSymbols((prevUsedSymbols) => [...prevUsedSymbols, randomIndex]);

      // Immediately generate a new symbol and reset the answer submission flag after
      generateNewSymbol();

      // Set a new start time for the next round
      setStartTime(Date.now());

      // Reset the answer submission flag after updating the symbol
      setTimeout(() => {
        setIsAnswerSubmitted(false);
      }, 300); // Small delay to prevent instant re-clicks

      // Increase the number of turns
      setTurns((prevTurns) => prevTurns + 1);
    }
  };

  return (
    <>
      {turns < 5 ? ( // Adjusted to 5 turns
        <View style={styles.container}>
          <View style={styles.topSection}>
            {result != null && (
              <View
                style={[
                  styles.resultContainer,
                  result === true ? styles.resultContainerCorrect : styles.resultContainerIncorrect,
                ]}
              >
                <Text
                  style={[
                    styles.resultText,
                    result === true ? styles.resultTextCorrect : styles.resultTextIncorrect,
                  ]}
                >
                  {result === true ? 'Correct' : 'Incorrect'}
                </Text>
              </View>
            )}
            <View style={styles.symbolContainer}>
              <Text style={styles.symbol}>{symbols[randomIndex]}</Text>
            </View>
          </View>

          <View style={styles.symbolsLine}>
            {symbols.map((symbol, index) => (
              <View key={index} style={styles.symbolItem}>
                <Text style={styles.symbolButtonText}>{symbol}</Text>
                <TouchableOpacity
                  style={styles.symbolButton}
                  onPress={() => submitAnswer(index)}
                  disabled={usedSymbols.includes(index)}
                >
                  <Text style={styles.buttonText}>{index + 1}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <ScoreMiniGame3 score={score} maxScore={250} details={details} navigation={navigation} /> // Total out of 250
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the entire screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#f0f4f7',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the items horizontally
    alignItems: 'center', // Align the items vertically
    marginBottom: 200,
  },
  resultContainer: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    marginRight: 20,
  },
  resultContainerCorrect: {
    borderColor: '#28a745',
    backgroundColor: '#d4edda',
  },
  resultContainerIncorrect: {
    borderColor: '#dc3545',
    backgroundColor: '#f8d7da',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  resultTextCorrect: {
    color: '#155724',
  },
  resultTextIncorrect: {
    color: '#721c24',
  },
  symbolContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#007bff',
    padding: 20,
    width: '25%',
    elevation: 3,
  },
  symbol: {
    fontSize: 50,
    color: '#fff',
  },
  symbolsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  symbolItem: {
    alignItems: 'center',
  },
  symbolButtonText: {
    fontSize: 40,
    marginBottom: 10,
    color: '#333',
  },
  symbolButton: {
    borderWidth: 2,
    borderColor: '#007bff',
    backgroundColor: '#007bff',
    borderRadius: 12,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MiniGame3;
