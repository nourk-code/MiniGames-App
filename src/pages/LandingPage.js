// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const LandingPage = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Landing Page Content</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 18,
//     color: '#000',
//   },
// });

// export default LandingPage;

// pages/LandingPage.js
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    // Lock the orientation to landscape
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      // Unlock all orientations
      ScreenOrientation.unlockAsync();
    };
  }, []);

    return (
        <View style={styles.bigContainer}>
            {/* <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PupilIrisDetection')}>
                    <Text style={styles.buttonText}>Detect Pupil to Iris Ratio</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.row}>

                <View style={styles.columnXCenter}>
                    <TouchableOpacity style={styles.sqare}
                        onPress={() => navigation.navigate("intruction",
                            {
                                text: "You will be shown 3 different shaded shapes, one at a time. Do your best to remember each entire shape.",
                                url: "demo1"
                            })
                        }
                    >
                        <Image source={require('../../assets/images/game1.jpeg')} style={styles.img} />
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        Visual Object Learning Task
                    </Text>
                </View>

                <View style={styles.columnXCenter}>
                    <TouchableOpacity style={styles.sqare}
                        onPress={() => navigation.navigate("intruction",
                            {
                                text: "Choose the pair of shapes that best fits with the single shape.",
                                url: "game2"
                            })
                        }
                    >
                        <Image source={require('../../assets/images/game2.jpeg')} style={styles.img} />
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        Abstract Matching
                    </Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.columnXCenter}>
                    <TouchableOpacity style={styles.sqare}
                        onPress={() => navigation.navigate("intruction",
                            {
                                text: "Tap the number that matches the symbol in the box.",
                                url: "game3"
                            })
                        }
                    >
                        <Image source={require('../../assets/images/game3.jpeg')} style={styles.img} />
                    </TouchableOpacity>
                    <Text style={styles.text} >
                        Digital Symbol Substitution Task
                    </Text>
                </View>

                <View style={styles.columnXCenter}>
                    <TouchableOpacity style={styles.sqare}
                        onPress={() => navigation.navigate("intruction",
                            {
                                text: "Tap the screen with two fingers when you see one dot. Do NOT tap the screen when you see two dots. Use left hand.",
                                url: "game4"
                            })
                        }
                    >
                        <Image source={require('../../assets/images/game4.jpeg')} style={styles.img} />
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        Go No Go Test
                    </Text>
                </View>

                <View style={styles.columnXCenter}>
                    <TouchableOpacity style={styles.sqare}
                        onPress={() => navigation.navigate("intruction",
                            {
                                text: "Tap the squares as they appear. They will get smaller each time. Tap as many as you can!",
                                url: "game5"
                            })
                        }
                    >
                        <Image source={require('../../assets/images/game4.jpeg')} style={styles.img} />
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        Square Tapping Game
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bigContainer: {
        flex: 1,
        paddingVertical: '2%',
        paddingHorizontal: '10%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    columnXCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sqare: {
        height: 100,
        width: 100,
        backgroundColor: 'blue',
    },
    text: {
        fontSize: 18,
        marginTop: 2
    },
    img: {
        height: '100%',
        width: '100%'
    }
})

export default LandingPage;