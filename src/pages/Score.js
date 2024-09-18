// pages/Score.js
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import React from 'react';

const Score = ({ navigation, score, details, maxScore }) => {
    // Determine the message based on the score range
    const getMessage = (score, maxScore) => {
        if (score === maxScore) {
            return "Excellent work!";
        } else if (score >= 200 && score < maxScore) {
            return "Good job!";
        } else if (score >= 150 && score < 200) {
            return "Nice effort!";
        } else if (score >= 100 && score < 150) {
            return "Keep trying!";
        } else {
            return "Better luck next time!";
        }
    };

    return (
        <View style={styles.container}>
            {/* Display the score and dynamic message */}
            <Text style={styles.title}> {getMessage(score, maxScore)}</Text>
            <Text style={styles.score}>
                {`${score} / ${maxScore}`}
            </Text>

            {/* Scrollable container for score details */}
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                {details.map((detail, index) => (
                    <View key={index} style={styles.detailRow}>
                        <Text style={styles.detailTitle}>Turn {index + 1}</Text>
                        <Text style={styles.detailText}>Response Time: {detail.responseTime} s</Text>
                        <Text style={styles.detailText}>Answer Score: {detail.answerScore} / 50</Text>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("landing")}>
                <Text style={styles.buttonText}>Home Page</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '93%', // Set a specific height to make the container smaller
        paddingTop: '10%', // Adjusted padding to fit the smaller height
        paddingHorizontal: 10,
        backgroundColor: '#f7f9fc', // Light background for better contrast
        alignItems: 'center',
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        textAlign: 'center', // Center the text for better presentation
    },
    score: {
        fontSize: 30,
        color: 'blue',
        fontWeight: 'bold',
        marginBottom: 15, // Adjusted margin to balance layout
    },
    scrollContainer: {
        flex: 1, // Use flex to take up all available space
        width: '100%',
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    detailRow: {
        backgroundColor: '#fff',
        marginBottom: 15,
        padding: 15,
        width: '90%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Adds shadow for Android
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 18,
        color: '#555',
    },
    button: {
        marginTop: 70, // Reduced margin to bring button higher
        height: 50,
        width: 200,
        backgroundColor: '#0047AB', // Nicer blue color for button
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Adds shadow for Android
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default Score;
