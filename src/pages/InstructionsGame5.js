// pages/InstructionsGame5.js
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Orientation from "react-native-orientation-locker";

const InstructionsGame5 = ({ navigation, url, text }) => {
    useEffect(() => {
        Orientation.lockToLandscape();
        return () => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Instructions</Text>
            <Text style={styles.instructionText}>Tap the squares as they appear on the screen. Each time a square disappears, a smaller one will appear. Try to tap as many squares as you can before they disappear. There will be a total of 20 squares.</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate(url)}>
                <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        marginBottom: 20,
    },
    instructionText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

export default InstructionsGame5;
