import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, FlatList } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Instructions from '../reusable/Instructions';
import { ImageBackground } from 'react-native';

const LandingPage = ({ navigation }) => {
  // Hooks must be inside the component function
  const [dimensions, setDimensions] = useState({
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [extraText, setExtraText] = useState(null);

  useEffect(() => {
    (async () => {
      // Lock screen orientation to landscape
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

      const handleResize = () => {
        const { width, height } = Dimensions.get('window');
        setDimensions({ screenWidth: width, screenHeight: height }); // Update both width and height
      };
      
      // Set initial dimensions
      handleResize();

      // Subscribe to dimension changes
      const subscription = Dimensions.addEventListener('change', handleResize);
      
      // Clean up the event listener on component unmount
      return () => {
        subscription?.remove();
      };
    })();
  }, []);

  // Function to open the modal
  const openModal = (text, url, extraText = null) => {
    setModalContent({ text, url });
    setModalVisible(true);
    setExtraText(extraText);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setExtraText(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/images/banner5.png')}
            style={[styles.widget, { width: dimensions.screenWidth * 0.96, height: dimensions.screenHeight * 0.20 }]} // Dynamically use the updated width and height
            resizeMode="cover"
          >
            <Text style={styles.widgetTitle}></Text>
            <Text style={styles.widgetSubtitle}></Text>
          </ImageBackground>

          <View style={styles.header}>
            <Text style={styles.headerTitle}></Text>
          </View>

          <FlatList
            data={games}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.label}</Text>
                    <Text style={styles.description}>{item.text}</Text>
                  </View>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => openModal(item.text, item.url, item.extraText)}>
                    <Text style={styles.buttonText}>Play</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={styles.grid}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />

          <Instructions 
            visible={isModalVisible} 
            navigation={navigation} 
            route={{ params: modalContent }} 
            onClose={closeModal}
            extraText={extraText}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// Your game data
const games = [
  { 
    label: "Visual Object Learning Task", 
    text: "Remember each shape shown one at a time.", 
    url: "demo1", 
    icon: require('../../assets/images/icon1.png'),
    extraText: "Once you click on the next button, pay close attention to each shape that appears on the screen. Your goal is to remember them. This task will challenge your memory and attention to detail! Ready? Go!"
  },
  { label: "Abstract Reasoning", text: "Identify the pair of shapes that follows the given pattern.", url: "game2", icon: require('../../assets/images/icon1.png'), extraText: "Once you click on the next button, you will see a series of patterns and shapes. Pay close attention to each one. This test will challenge your reasoning and ability to detect logical sequences! You will face five questions in total. Ready? Go!" },
  { 
    label: "Digital Symbol Substitution Task", 
    text: "Match the number to the symbol in the box.", 
    url: "game3", 
    icon: require('../../assets/images/icon1.png'),
    extraText: "Match the number to the correct symbol as quickly as possible! This task will test how fast you are. The timer will start when you click on the Next button. Ready? Go!"
  },
  { 
    label: "Go No Go Test", 
    text: "Tap the screen correctly for different dots.", 
    url: "game4", 
    icon: require('../../assets/images/icon1.png'),
    extraText: "Pay close attention to the dots that appear on the screen. This task tests your focus and quick decision-making. A guide will be shown to you once you click on the next button. Ready? Go!"
  },  
  { 
    label: "Square Tapping Game", 
    text: "Tap the squares as they appear on the screen.", 
    url: "game5", 
    icon: require('../../assets/images/icon1.png'),
    extraText: "Tap the squares as they appear on the screen and make sure to do it as fast as possible. This task will test your reaction speed! Ready? Go!"
  },
  { 
    label: "Psychomotor Vigilance Test", 
    text: "React quickly to numbers appearing on screen.", 
    url: "game6", 
    icon: require('../../assets/images/icon1.png'),
    extraText: "Watch the rectangle, when numbers appear inside it, tap the button as quickly as you can. The numbers count in milliseconds. Try to get the fastest time without tapping the button too early. Ready? Go!"
  },
];

// StyleSheet with dynamic width/height adjustments
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  widget: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: '#1432B3',
  },
  widgetTitle: {
    color: '#fff',
    fontSize: 33,
    fontWeight: '900',
    textAlign: 'center',
  },
  widgetSubtitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 5,
  },
  header: {
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
  grid: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0047AB',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default LandingPage;
