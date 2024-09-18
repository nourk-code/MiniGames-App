// pages/MiniGame1.js
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { euclideans } from "../utils/euclideans";
import Score from "./Score";

const MiniGame1 = ({ navigation, route }) => {
    const { listIndex } = route.params; // Get list of indices shown in DemoGame1
    const [index, setIndex] = useState(-1);
    const [score, setScore] = useState(0);
    const [turn, setTurn] = useState(0);
    const [startTime, setStartTime] = useState(Date.now()); // Track start time
    const [details, setDetails] = useState([]); // Store score details
    const [shownIndexes, setShownIndexes] = useState([]); // Track shown images to avoid repetition

    const maxScore = 250; // Correct maximum possible score: 5 turns, each with a max score of 50

    useEffect(() => {
        selectRandomIndex();
    }, []);

    const selectRandomIndex = () => {
        const availableIndexes = [...Array(euclideans.length).keys()].filter(
            (i) => !shownIndexes.includes(i) // Exclude already shown images
        );

        if (availableIndexes.length > 0) {
            const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
            setIndex(randomIndex);
            setShownIndexes((prevShownIndexes) => [...prevShownIndexes, randomIndex]); // Mark this image as shown
            setStartTime(Date.now());
        } else {
            console.log("No more unique images available.");
        }
    };

    const calculateScore = (userChoice) => {
        const responseTime = (Date.now() - startTime) / 1000; // Time taken in seconds
        let answerScore = 0;

        const isCorrect = listIndex.includes(index); // Check if the image was shown in DemoGame1

        if ((isCorrect && userChoice === "Definitely Yes") || (isCorrect && userChoice === "Probably Yes")) {
            answerScore = userChoice === "Definitely Yes" ? 50 : 25;
        } else if ((!isCorrect && userChoice === "Definitely No") || (!isCorrect && userChoice === "Probably No")) {
            answerScore = userChoice === "Definitely No" ? 50 : 25;
        } else {
            answerScore = 0; // Incorrect answer gets 0 points
        }

        setScore((prevScore) => prevScore + answerScore); // Update total score

        // Add the score details for display later
        setDetails((prevDetails) => [
            ...prevDetails,
            {
                responseTime: responseTime.toFixed(2),
                answerScore: answerScore,
            },
        ]);

        turnAndIndex();
    };

    const handleAnswer = (choice) => {
        calculateScore(choice);
    };

    const turnAndIndex = () => {
        setTurn((prevTurn) => prevTurn + 1);
        selectRandomIndex();
    };

    return (
        <>
            {turn < 5 ? (
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        {index !== -1 && (
                            <Image style={styles.img} source={euclideans[index].url} />
                        )}
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handleAnswer("Definitely Yes")}>
                            <Text style={styles.text}>Definitely Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleAnswer("Probably Yes")}>
                            <Text style={styles.text}>Probably Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleAnswer("Probably No")}>
                            <Text style={styles.text}>Probably No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleAnswer("Definitely No")}>
                            <Text style={styles.text}>Definitely No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Score navigation={navigation} score={score} details={details} maxScore={maxScore} />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8", // Light background color for better contrast
    },
    imageContainer: {
        width: "100%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    img: {
        width: "90%", // Adjusted width to ensure it's not too large
        height: "90%", // Adjusted height to keep aspect ratio
        resizeMode: "contain", // Keeps the aspect ratio of the image
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: "20%",
        width: "100%",
        paddingHorizontal: 10,
    },
    button: {
        width: "22%",
        backgroundColor: "#0047AB", // A nicer blue color for buttons
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 20,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Adds shadow for Android
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default MiniGame1;
