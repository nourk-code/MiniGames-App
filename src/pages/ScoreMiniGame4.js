import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const ScoreMiniGame4 = ({ navigation, correctCount, incorrectCount, timeTaken }) => {
  // Capture dimensions once at the start
  const [screenDimensions, setScreenDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    // Set initial screen dimensions and listen for changes (e.g., screen rotation)
    const updateDimensions = ({ window }) => {
      setScreenDimensions({
        width: window.width,
        height: window.height,
      });
    };

    // Listen for changes in screen dimensions
    const subscription = Dimensions.addEventListener('change', updateDimensions);

    // Clean up the event listener
    return () => {
      subscription?.remove();
    };
  }, []);

  // Function to display a message based on the player's performance
  const getFeedbackMessage = () => {
    if (incorrectCount === 0) {
      return 'Great job! You have excellent reflexes!';
    } else if (incorrectCount <= 3) {
      return 'Good effort! Keep practicing to improve your reflexes!';
    } else {
      return 'Not bad, but you can do better! Keep working on those reflexes!';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { height: screenDimensions.height * 0.7 }]}>
        <Text style={styles.title}>Game Over</Text>

        {/* Display feedback based on performance */}
        <Text style={styles.feedbackMessage}>{getFeedbackMessage()}</Text>
        <Text style={styles.resultText}>Correct Taps: {correctCount}</Text>
        <Text style={styles.resultText}>Incorrect Taps: {incorrectCount}</Text>

        {/* Home Page Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('landing')} // Navigate back to the home page
        >
          <Text style={styles.buttonText}>Home Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  resultCard: {
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  resultText: {
    fontSize: 18,
    color: '#2980B9',
    fontWeight: '600',
  },
  feedbackMessage: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0047AB',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScoreMiniGame4;
