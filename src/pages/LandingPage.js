import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground, FlatList } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import Instructions from '../reusable/Instructions'; // Import Instructions component

const { width: screenWidth } = Dimensions.get('window'); // Get initial screen width

const LandingPage = ({ navigation }) => {
  const [width, setWidth] = useState(screenWidth * 0.96); // Initialize with 96% of screen width
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState({}); // State for modal content

  useEffect(() => {
    // Lock the screen orientation to landscape
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    const handleResize = () => {
      const { width } = Dimensions.get('window'); // Get the current screen width
      setWidth(width * 0.96); // Update the widget width to be 96% of the new width
    };

    // Listen for screen dimension changes
    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => {
      // Cleanup the subscription and unlock all orientations when the component unmounts
      subscription?.remove();
      ScreenOrientation.unlockAsync();
    };
  }, []);

  // Function to open the modal
  const openModal = (text, url) => {
    setModalContent({ text, url });
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Title, Description, and Icon */}
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.label}</Text>
          <Text style={styles.description}>{item.text}</Text>
        </View>
        <Image source={item.icon} style={styles.icon} />
      </View>
      {/* Play Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => openModal(item.text, item.url)}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Widget Section with Image Background */}
      <ImageBackground
        source={require('../../assets/images/banner5.png')}
        style={[styles.widget, { width }]} // Use dynamic width
        resizeMode="cover"
      >
        <Text style={styles.widgetTitle}></Text>
        <Text style={styles.widgetSubtitle}></Text>
      </ImageBackground>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
      </View>
      
      {/* Game Options Section */}
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Fixed number of columns
        columnWrapperStyle={styles.grid} // Custom style for each row
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Instructions Modal */}
      <Instructions visible={isModalVisible} navigation={navigation} route={{ params: modalContent }} onClose={closeModal} />
    </View>
  );
};

// Game data configuration with icons
const games = [
  { label: "Visual Object Learning Task", text: "Remember each shape shown one at a time.", url: "demo1", icon: require('../../assets/images/icon1.png') },
  { label: "Abstract Matching", text: "Select the pair of shapes that matches the given shape.", url: "game2", icon: require('../../assets/images/icon1.png') },
  { label: "Digital Symbol Substitution Task", text: "Match the number to the symbol in the box.", url: "game3", icon: require('../../assets/images/icon1.png') },
  { label: "Go No Go Test", text: "Tap the screen correctly for different dots.", url: "game4", icon: require('../../assets/images/icon1.png') },
  { label: "Square Tapping Game", text: "Tap the squares as they appear on the screen.", url: "game5", icon: require('../../assets/images/icon1.png') },
  { label: "Psychomotor Vigilance Test", text: "React quickly to numbers appearing on screen.", url: "game6", icon: require('../../assets/images/icon1.png') },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  widget: {
    height: 170,
    marginBottom: 20,
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
