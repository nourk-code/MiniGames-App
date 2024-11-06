import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ScoreMiniGame6 = ({ navigation, reactionTimes }) => {
    // Ensure reactionTimes is not undefined or null
    if (!reactionTimes || reactionTimes.length === 0) {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}> No data available for reaction times </Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("landing")}>
                        <Text style={styles.buttonText}>Home Page</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Calculate average reaction time
    const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;

    // Provide feedback based on reaction time
    const getFeedback = (averageTime) => {
        if (averageTime < 700) {
            return "Incredible Reflexes! You’re lightning fast!";
        } else if (averageTime < 1000) {
            return "Good Reflexes!";
        } else if (averageTime < 2000) {
            return "Good Effort!";
        } else if (averageTime < 3000) {
            return "Keep Practicing!";
        } else {
            return "Keep practicing!";
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {/* Display the dynamic feedback and reaction times */}
                <Text style={styles.title}> {getFeedback(averageTime)} </Text>
                <Text style={styles.score}>{`Your average reaction time: ${averageTime.toFixed(2)} ms`}</Text>

                {/* Comparison with the average reaction time for a conscious person */}
                <Text style={styles.comparison}>
                    {`Average reaction time of a person with good reflexes is below 700 ms.`}
                </Text>

                {/* List individual reaction times */}
                {reactionTimes.map((time, index) => (
                    <Text key={index} style={styles.reactionTime}>
                        {`Turn ${index + 1}: ${time ? time.toFixed(2) : 'No data'} ms`}
                    </Text>
                ))}

                {/* Button to return to the home page */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("landing")}>
                    <Text style={styles.buttonText}>Home Page</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1, // Fill the screen
        justifyContent: 'center', // Center the container vertically
        alignItems: 'center', // Center the container horizontally
        backgroundColor: "#ffffff", // Optional: set a background color if needed
    },
    container: {
        width: '70%', // 70% of the screen width
        height: '70%', // 70% of the screen height
        backgroundColor: "white",
        paddingVertical: '5%', // Percentage-based padding
        paddingHorizontal: '5%', // Percentage-based padding
        borderRadius: 10,
        justifyContent: 'space-around', // Evenly distribute elements in the container
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20, // Fixed font size
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
    score: {
        fontSize: 20, // Fixed font size
        color: "blue",
        fontWeight: "bold",
        textAlign: "center",
    },
    comparison: {
        fontSize: 14, // Fixed font size
        color: "#555",
        textAlign: "center",
        fontStyle: "italic", // Added italics for the comparison
    },
    reactionTime: {
        fontSize: 14, // Fixed font size
        color: "#333",
        textAlign: "center",
    },
    button: {
        height: 40, // Fixed button height
        width: '20%', // Percentage-based button width
        backgroundColor: "#0047AB",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 14, // Fixed font size
        fontWeight: "bold",
        color: "white",
    },
});

export default ScoreMiniGame6;
