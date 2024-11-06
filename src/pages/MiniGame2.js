import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import ScoreMiniGame2 from './ScoreMiniGame2'; // Import Score component



// Example paths for images (replace these with your actual image paths)
const questionData = [
    {
      mainShape: require('../../assets/abstractimages/mainShape1.png'),
      questionText: 'Choose the image that completes the pattern (From left to right):', // New question text
      options: [
        { image: require('../../assets/abstractimages/option1.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/option2.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/option3.png'), isCorrect: true },  // Correct Option
        { image: require('../../assets/abstractimages/option4.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/option5.png'), isCorrect: false },
      ],
    },
    {
      mainShape: require('../../assets/abstractimages/mainShape2.png'),
      questionText: 'Choose the correct three figures to complete the sequence:', // New question text
      options: [
        { image: require('../../assets/abstractimages/option11.png'), isCorrect: true },  // Correct Option
        { image: require('../../assets/abstractimages/option22.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/option33.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/option44.png'), isCorrect: false },
      ],
    },
    {
      mainShape: require('../../assets/abstractimages/mainShape3.png'),
      questionText: 'Which of the following boxes should replace the question mark (?) to complete the pattern?', // New question text
      options: [
        { image: require('../../assets/abstractimages/option111.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/option222.png'), isCorrect: true },  // Correct Option
        { image: require('../../assets/abstractimages/option333.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/option444.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/option555.png'), isCorrect: false },
      ],
    },
    {
      mainShape: require('../../assets/abstractimages/mainShape4.png'),
      questionText: 'Which of the following boxes should replace the question mark (?) to complete the pattern?', // New question text
      options: [
        { image: require('../../assets/abstractimages/optionn1.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/optionn2.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/optionn3.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/optionn4.png'), isCorrect: true },  // Correct Option
        { image: require('../../assets/abstractimages/optionn5.png'), isCorrect: false },
      ],
    },
    {
      mainShape: require('../../assets/abstractimages/mainShape5.png'),
      questionText: 'Which option completes the sequence best?', // New question text
      options: [
        { image: require('../../assets/abstractimages/optionnn1.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/optionnn2.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/optionnn3.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/optionnn4.png'), isCorrect: false },
        { image: require('../../assets/abstractimages/optionnn5.png'), isCorrect: true },  // Correct Option
      ],
    },
  ];
  

  const MiniGame2 = ({ navigation }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [showScore, setShowScore] = useState(false);
  
    // State to track dimensions
    const [dimensions, setDimensions] = useState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    });
  
    const question = questionData[questionIndex];
  
    useEffect(() => {
      // Lock screen orientation to landscape
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  
      // Listen for dimension changes (e.g. screen orientation changes)
      const handleResize = () => {
        setDimensions({
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        });
      };
  
      const subscription = Dimensions.addEventListener('change', handleResize);
  
      return () => {
        // Cleanup the event listener
        if (subscription?.remove) {
          subscription.remove();
        }
        ScreenOrientation.unlockAsync();
      };
    }, []);
  
    if (!question) {
      return (
        <View style={styles.container}>
          <Text style={styles.feedbackText}>No more questions available</Text>
        </View>
      );
    }
  
    const handleAnswer = (selectedOptionIndex) => {
      if (!isAnswerSubmitted) {
        setIsAnswerSubmitted(true);
        setSelectedOption(selectedOptionIndex);
        const isCorrect = question.options[selectedOptionIndex].isCorrect;
  
        if (isCorrect) {
          setScore((prevScore) => prevScore + 50);
          setCorrectCount((prevCount) => prevCount + 1);
        } else {
          setIncorrectCount((prevCount) => prevCount + 1);
        }
  
        setTimeout(() => {
          if (questionIndex + 1 < questionData.length) {
            setQuestionIndex(questionIndex + 1);
            setSelectedOption(null);
            setIsAnswerSubmitted(false);
          } else {
            setShowScore(true);
          }
        }, 1000);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!showScore ? (
          <>
            <View style={[styles.mainShapeContainer, { height: dimensions.height * 0.5 }]}>
              <Image source={question.mainShape} style={[styles.shapeImage, { height: dimensions.height * 0.4 }]} />
            </View>
  
            <Text style={styles.questionText}>{question.questionText}</Text>
  
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    { width: dimensions.width * 0.10, height: dimensions.width * 0.10 },
                    selectedOption === index && (option.isCorrect ? styles.correctButton : styles.incorrectButton),
                  ]}
                  onPress={() => handleAnswer(index)}
                >
                  <Image source={option.image} style={[styles.optionImage, { height: dimensions.width * 0.08 }]} />
                </TouchableOpacity>
              ))}
            </View>
  
            {isAnswerSubmitted && selectedOption !== null && (
              <Text style={styles.feedbackText}>
                {question.options[selectedOption]?.isCorrect ? "Correct!" : "Incorrect!"}
              </Text>
            )}
          </>
        ) : (
          <ScoreMiniGame2
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            score={score}
            navigation={navigation}
          />
        )}
      </ScrollView>
    );
  };
  
  // Styles
  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20,
    },
    mainShapeContainer: {
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    shapeImage: {
      width: '90%',
      resizeMode: 'contain',
    },
    questionText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '75%',
    },
    optionButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#007bff',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#0056b3',
      margin: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    correctButton: {
      backgroundColor: '#28a745',
      borderColor: '#28a745',
    },
    incorrectButton: {
      backgroundColor: '#dc3545',
      borderColor: '#dc3545',
    },
    optionImage: {
      resizeMode: 'contain',
    },
    feedbackText: {
      marginTop: 20,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
  });
  
  export default MiniGame2;
