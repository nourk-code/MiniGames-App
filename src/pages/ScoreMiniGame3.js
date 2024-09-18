import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import React from 'react';

const ScoreMiniGame3 = ({ navigation, score, details, maxScore }) => {
    // Average time that people who are conscious take (11-12 seconds)
    const averageTimeMin = 11;
    const averageTimeMax = 12;

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

    // Calculate total time
    const totalTime = details.reduce((acc, curr) => acc + (curr.responseTime || 0), 0).toFixed(2);

    // Determine the feedback based on the comparison with the average time
    const getTimeFeedback = () => {
        const avgTime = (averageTimeMin + averageTimeMax) / 2;
        if (totalTime < avgTime) {
            return `Well done! You were faster than the average time (${averageTimeMin}-${averageTimeMax} seconds).`;
        } else {
            return `You took longer than the average time (${averageTimeMin}-${averageTimeMax} seconds). Keep practicing!`;
        }
    };

    return (
        <View style={styles.container}>
            {/* Display the score and dynamic message */}
            <Text style={styles.title}> {getMessage(score, maxScore)}</Text>
            <Text style={styles.score}>
                {`${score} / ${maxScore}`}
            </Text>

            {/* Display total time taken */}

            {/* Display average time feedback */}
            <View style={styles.feedbackContainer}>
            <Text style={styles.totalTime}>Total Time: {totalTime} seconds</Text>

                <Text style={styles.timeFeedbackText}>
                    {getTimeFeedback()}
                </Text>
            </View>

            {/* Scrollable container for score details */}
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                {(details || []).map((detail, index) => (
                    <View key={index} style={styles.detailRow}>
                        <Text style={styles.detailTitle}>Turn {index + 1}</Text>
                        <Text style={styles.detailText}>Response Time: {detail.responseTime.toFixed(2)} s</Text>
                        <Text style={styles.detailText}>Correct: {detail.isCorrect ? 'Yes' : 'No'}</Text>
                        <Text style={styles.detailText}>Score: {detail.points}</Text>
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
        height: '96%',
        paddingTop: '10%',
        paddingHorizontal: 10,
        backgroundColor: '#f7f9fc', // Light background for better contrast
        alignItems: 'center',
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
    },
    score: {
        fontSize: 30,
        color: 'blue',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    totalTime: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    feedbackContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#eef1f5',
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    averageTimeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    timeFeedbackText: {
        fontSize: 20,
        color: '#007bff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 1, 
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
        elevation: 2,
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
        marginTop: 70,
        height: 50,
        width: 200,
        backgroundColor: '#0047AB', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, 
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default ScoreMiniGame3;
