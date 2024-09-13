import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

const { width, height } = Dimensions.get('window'); // Get the screen dimensions

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    // Lock the screen orientation to landscape
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      // Unlock all orientations when the component unmounts
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {/* Game Options */}
        {games.map((game, index) => (
          <View key={index} style={styles.gridItem}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("intruction", game)}>
              <Image source={game.image} style={styles.img} />
            </TouchableOpacity>
            <Text style={styles.text}>{game.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Games configuration
const games = [
  {
    label: "Visual Object Learning Task",
    text: "You will be shown 3 different shaded shapes, one at a time. Do your best to remember each entire shape.",
    url: "demo1",
    image: require('../../assets/images/game1.jpeg'),
  },
  {
    label: "Abstract Matching",
    text: "Choose the pair of shapes that best fits with the single shape.",
    url: "game2",
    image: require('../../assets/images/game2.jpeg'),
  },
  {
    label: "Digital Symbol Substitution Task",
    text: "Tap the number that matches the symbol in the box.",
    url: "game3",
    image: require('../../assets/images/game3.jpeg'),
  },
  {
    label: "Go No Go Test",
    text: "Tap the screen with two fingers, one tap after another, when you see one dot. Do NOT tap the screen when you see two dots. Use left hand.",
    url: "game4",
    image: require('../../assets/images/game4.jpeg'),
  },
  {
    label: "Square Tapping Game",
    text: "Tap the squares as they appear. They will get smaller each time. Tap as many as you can!",
    url: "game5",
    image: require('../../assets/images/minigame5.jpg'),
  },
  {
    label: "Psychomotor Vigilance Test",
    text: "Watch the rectangle, when the numbers appear inside of it tap the screen as quickly as you can. The numbers count in milliseconds. Try to get the fastest time without tapping the screen early!",
    url: "game6",
    image: require('../../assets/images/mingame6.jpg'),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background color
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    width: width * 0.4, // Make each grid item take up 40% of the screen width
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    width: '100%',
    height: height * 0.25, // Make the button height responsive
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3, // Add a shadow for Android
    shadowColor: '#000', // Add a shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});

export default LandingPage;
