// pages/InstructionsDemo1.js
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';

const InstructionsDemo1 = ({ navigation, url, text, listIndex }) => {
    useEffect(() => {
        // Lock the screen orientation to landscape
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        return () => {
            // Unlock all orientations when the component unmounts
            ScreenOrientation.unlockAsync();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate(url)}
                style={styles.headerText}
            >
                Instructions
            </Text>
            <Text style={styles.instructionText}>Now you will see a larger group of shapes, one at a time. Some of these shapes you
                have seen before and some are new. For each shape you are shown, answer if you
                have seen it before or not. Be as accurate and as fast as you can.
            </Text>
            <View style={styles.instructionsList}>
                <Text style={styles.intructionTextNoMargin}>Tap 'Definitely yes' if you're sure you have seen it.</Text>
                <Text style={styles.intructionTextNoMargin}>Tap 'Probably yes' if you think you have seen it.</Text>
                <Text style={styles.intructionTextNoMargin}>Tap 'Probably no' if you think you have not seen it.</Text>
                <Text style={styles.intructionTextNoMargin}>Tap 'Definitely no' if you're sure you have not seen it.</Text>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate(url, { listIndex: listIndex })}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4', // Light background color for better readability
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000', // Black color for the header text
    },
    instructionText: {
        fontSize: 18,
        marginVertical: 15,
        textAlign: 'center',
        lineHeight: 24, // Improves readability
        color: '#333333', // Lighter black color for the instruction text
    },
    instructionsList: {
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    intructionTextNoMargin: {
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        color: '#333333', // Lighter black color for list items
    },
    nextButton: {
        marginTop: 30,
        alignSelf: 'center',
        width: 150,
        height: 50,
        backgroundColor: '#0047AB', // Darker blue color for the button
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Adds shadow for Android
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default InstructionsDemo1;
