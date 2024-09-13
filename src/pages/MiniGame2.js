// pages/MiniGame2.js
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { pictures } from "../utils/pictures";
import * as ScreenOrientation from 'expo-screen-orientation';
import Score from "./Score";

const Minigame2 = ({ navigation }) => {
    const [mainShapeIndex, setMainShapeIndex] = useState(Math.floor(Math.random() * pictures.length));
    const mainImageShape = pictures[mainShapeIndex].url;
    const [firstShapeOptionIndex, setfirstShapeOptionIndex] = useState(Math.floor(Math.random() * pictures.length));
    const firstOptionImageShape = pictures[firstShapeOptionIndex].url;
    const [secondShapeOptionIndex, setSecondShapeOptionIndex] = useState(Math.floor(Math.random() * pictures.length));
    const secondOptionImageShape = pictures[secondShapeOptionIndex].url;
    const [thirdShapeOptionIndex, setThirdShapeOptionIndex] = useState(Math.floor(Math.random() * pictures.length));
    const thirdOptionImageShape = pictures[thirdShapeOptionIndex].url;
    const [fourthShapeOptionIndex, setFourthShapeOptionIndex] = useState(Math.floor(Math.random() * pictures.length));
    const fourthOptionImageShape = pictures[fourthShapeOptionIndex].url;
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [score, setScore] = useState(0);
    const [turns, setTurns] = useState(0);
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Lock the screen orientation to landscape
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        setStartTime(Date.now());
    
        return () => {
            // Unlock all orientations when the component unmounts
            ScreenOrientation.unlockAsync();
        };
    }, []);

    const rightPress = () => {
        if (!isAnswerSubmitted) {
            setIsAnswerSubmitted(true);
            setResult((Math.abs(mainShapeIndex - thirdShapeOptionIndex) + Math.abs(mainShapeIndex - fourthShapeOptionIndex))
                <= (Math.abs(mainShapeIndex - firstShapeOptionIndex) + Math.abs(mainShapeIndex - secondShapeOptionIndex)));
            const endTime = Date.now();
            const timeDiff = (endTime - startTime) / 1000;
            let points = 0;
            if ((Math.abs(mainShapeIndex - thirdShapeOptionIndex) + Math.abs(mainShapeIndex - fourthShapeOptionIndex))
                <= (Math.abs(mainShapeIndex - firstShapeOptionIndex) + Math.abs(mainShapeIndex - secondShapeOptionIndex))) {
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
                setMainShapeIndex(Math.floor(Math.random() * pictures.length));
                setFourthShapeOptionIndex(Math.floor(Math.random() * pictures.length));
                setSecondShapeOptionIndex(Math.floor(Math.random() * pictures.length));
                setThirdShapeOptionIndex(Math.floor(Math.random() * pictures.length));
                setfirstShapeOptionIndex(Math.floor(Math.random() * pictures.length));
                setStartTime(Date.now());
            }, 500);
            setTurns(turns + 1)
        }
    }

    const leftPress = () => {
        if (!isAnswerSubmitted) {
            setIsAnswerSubmitted(true);
            setResult((Math.abs(mainShapeIndex - thirdShapeOptionIndex) + Math.abs(mainShapeIndex - fourthShapeOptionIndex))
                >= (Math.abs(mainShapeIndex - firstShapeOptionIndex) + Math.abs(mainShapeIndex - secondShapeOptionIndex)));
            const endTime = Date.now();
            const timeDiff = (endTime - startTime) / 1000;
            let points = 0;
            if ((Math.abs(mainShapeIndex - thirdShapeOptionIndex) + Math.abs(mainShapeIndex - fourthShapeOptionIndex))
                >= (Math.abs(mainShapeIndex - firstShapeOptionIndex) + Math.abs(mainShapeIndex - secondShapeOptionIndex))) {
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
                setIsAnswerSubmitted(false);
                setResult(null);
                setMainShapeIndex(Math.floor(Math.random() * pictures.length));
                setFourthShapeOptionIndex(Math.floor(Math.random() * pictures.length));
                setSecondShapeOptionIndex(Math.floor(Math.random() * pictures.length));
                setThirdShapeOptionIndex(Math.floor(Math.random() * pictures.length));
                setfirstShapeOptionIndex(Math.floor(Math.random() * pictures.length));
                setStartTime(Date.now());
            }, 500);
            setTurns(turns + 1)
        }
    }

    return (
        <>
            {turns < 4 &&
                <View style={styles.container}>
                    <View style={styles.mainShapeContainer}>
                        <Image source={mainImageShape} style={styles.shapeImage} />
                    </View>

                    {result != null &&
                        <View
                            style={[styles.resultContainer,
                            result == true ? styles.resultContainerCorrect : styles.resultContainerInCorrect, {
                                width: '20%',
                                height: '25%'
                            }]}
                        >
                            <Text style={[styles.resultText, result == true ? styles.resultTextCorrect : styles.resultTextIncorrect]}>
                                {result == true ? 'Correct' : 'Incorrect'}
                            </Text>
                        </View>
                    }

                    <View style={[styles.rowSpaceBetween, { width: '100%', position: 'absolute', bottom: '5%' }]}>
                        <TouchableOpacity style={{ width: '40%', flexDirection: 'row' }}
                            onPress={() => leftPress()}>
                            <View>
                                <Image source={firstOptionImageShape} style={styles.shapeImage} />
                            </View>
                            <View>
                                <Image source={secondOptionImageShape} style={styles.shapeImage} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '40%', flexDirection: 'row' }}
                            onPress={() => rightPress()}>
                            <View>
                                <Image source={thirdOptionImageShape} style={styles.shapeImage} />
                            </View>
                            <View>
                                <Image source={fourthOptionImageShape} style={styles.shapeImage} />
                            </View>
                        </TouchableOpacity>
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
        flex: 1,
        paddingTop: '3%'
    },
    mainShapeContainer: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    shapeImage: {
        width: 150,
        height: 100
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    resultContainer: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default Minigame2;