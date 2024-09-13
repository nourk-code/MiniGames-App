// reusable/Instructions.js
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';

const Instructions = ({ navigation, route }) => {
    const { text, url } = route.params;

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
            <Text style={styles.instructionText}>{text} </Text>
            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.buttonText} onPress={() => navigation.navigate(url)}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    },
    headerText: {
        fontSize: 28
    },
    instructionText: {
        fontSize: 18,
        marginTop: '4%'
    },
    nextButton: {
        position: 'relative',
        marginTop: '15%',
        alignSelf: 'flex-end',
        width: 150,
        height: 70,
        backgroundColor: 'blue',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
})

export default Instructions