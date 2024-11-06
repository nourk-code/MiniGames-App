import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const ScoreMiniGame2 = ({ navigation, score, correctCount, incorrectCount }) => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => {
      if (subscription?.remove) {
        subscription.remove();
      }
    };
  }, []);

  // Function to display a message based on the player's performance
  const getFeedbackMessage = () => {
    if (correctCount === 5) {
      return 'Great job! You answered all questions correctly!';
    } else if (correctCount >= 3) {
      return 'Good effort! You got most of them right!';
    } else {
      return 'Keep practicing to improve your score!';
    }
  };

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.resultCard, 
          { height: dimensions.height * 0.6, width: dimensions.width * 0.5 } // Dynamically adjust both width and height
        ]}
      >
        <Text style={styles.title}>Game Over</Text>

        {/* Display feedback based on performance */}
        <Text style={styles.feedbackMessage}>{getFeedbackMessage()}</Text>
        <Text style={styles.resultText}>Correct Answers: {correctCount}</Text>
        <Text style={styles.resultText}>Incorrect Answers: {incorrectCount}</Text>

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
    backgroundColor: 'white', // Solid light background color
  },
  resultCard: {
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
    justifyContent: 'space-between', // Ensure space is distributed between elements
  },
  title: {
    fontSize: 24, // Adjusted for better readability
    fontWeight: 'bold',
    color: 'black',
  },
  resultText: {
    fontSize: 18, // Adjusted to fit within the container
    color: '#2980B9',
    fontWeight: '600',
  },
  feedbackMessage: {
    fontSize: 18, // Slightly smaller font to ensure it fits well
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 10, // Reduced padding to avoid overflow
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0047AB',
    paddingVertical: 12, // Reduced padding for the button to fit better
    paddingHorizontal: 50, // Adjusted to ensure proper layout
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16, // Adjusted to fit the button better
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScoreMiniGame2;
