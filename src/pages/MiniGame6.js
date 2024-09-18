import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScoreMiniGame6 from "./ScoreMiniGame6"; // Import the Score component

const MiniGame6 = ({ navigation }) => {
    const [score, setScore] = useState(0);
    const [turn, setTurn] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [displayTime, setDisplayTime] = useState("Wait..."); // Ensure initial state is a string
    const [reactionTimes, setReactionTimes] = useState([]); // Track all reaction times
    const timer = useRef(null);
    const interval = useRef(null);

    useEffect(() => {
        startNewTurn();
        return () => {
            clearTimeout(timer.current);
            clearInterval(interval.current);
        };
    }, []);

    const startNewTurn = () => {
        const randomDelay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 and 5 seconds
        timer.current = setTimeout(() => {
            setIsReady(true);
            setDisplayTime(0); // Set displayTime to a number when ready
            const startTime = Date.now();
            interval.current = setInterval(() => {
                setDisplayTime(Date.now() - startTime);
            }, 1);
        }, randomDelay);
    };

    const handleTap = () => {
        if (isReady) {
            clearInterval(interval.current);
            const reaction = displayTime;
            setIsReady(false);

            // Log reaction time and calculate score
            if (typeof reaction === "number") {
                setReactionTimes((prevTimes) => [...prevTimes, reaction]);
            }
            setTurn((prevTurn) => prevTurn + 1);

            if (turn < 4) {
                setDisplayTime("Wait...");
                startNewTurn();
            }
        } else {
            setDisplayTime("Too early!"); // Early tap penalty
            setScore((prevScore) => prevScore - 20);
        }
    };

    return (
        <>
            {turn < 5 && (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={handleTap}>
                        <View style={styles.rect}>
                            <Text style={styles.text}>
                                {/* Safely render displayTime */}
                                {typeof displayTime === "number"
                                    ? `${displayTime.toFixed(0)} ms`
                                    : displayTime}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            {turn >= 5 && (
                <ScoreMiniGame6
                    navigation={navigation}
                    reactionTimes={reactionTimes} // Pass reaction times to the Score component
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f7", // Light background for a clean look
        padding: 20, // Padding for better spacing
    },
    touchable: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#007bff", // Blue background for the button
        borderRadius: 12, // Rounded corners for the button
        elevation: 3, // Slight elevation for shadow effect
    },
    rect: {
        width: 250,
        height: 100,
        borderColor: "#0047AB", // Blue border for a cohesive color theme
        borderWidth: 2,
        borderRadius: 20, // Softer rounded corners
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff", // White background for contrast with text
        elevation: 5, // Elevation for shadow effect
        padding: 10,
    },
    text: {
        color: "#0047AB", // Blue text color for consistency
        fontSize: 35, // Larger font size for better visibility
        fontWeight: "bold", // Bold font for emphasis
    },
});

export default MiniGame6;
