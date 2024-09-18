import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ScoreMiniGame6 = ({ navigation, reactionTimes }) => {
    // Ensure reactionTimes is not undefined or null
    if (!reactionTimes || reactionTimes.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> No data available for reaction times </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("landing")}>
                    <Text style={styles.buttonText}>Home Page</Text>
                </TouchableOpacity>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f9fc",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 27,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
        textAlign: "center",
    },
    score: {
        fontSize: 30,
        color: "blue",
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    comparison: {
        fontSize: 20,
        color: "#555",
        marginBottom: 20,
        textAlign: "center",
        fontStyle: "italic", // Added italics for the comparison
    },
    reactionTime: {
        fontSize: 18,
        color: "#333",
        marginBottom: 5,
        textAlign: "center",
    },
    button: {
        marginTop: 50,
        height: 50,
        width: 200,
        backgroundColor: "#0047AB",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});

export default ScoreMiniGame6;
