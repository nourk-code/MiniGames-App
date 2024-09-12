// pages/InstructionsDemo1.js
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect } from "react";
import Orientation from "react-native-orientation-locker";

const InstructionsDemo1 = ({ navigation, url, text, listIndex }) => {
    useEffect(() => {
        Orientation.lockToLandscape();
        return () => {
            Orientation.unlockAllOrientations();
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
            <View style={{ padding: 20 }}>
                <Text style={styles.intructionTextNoMargin}>Tap 'Definitely yes' if you're sure you have seen it.</Text>
                <Text style={styles.intructionTextNoMargin}>Tap 'Probably yes' if you think you have seen it.</Text>
                <Text style={styles.intructionTextNoMargin}>Tap 'Probably no' if you think you have not seen it.</Text>
                <Text style={styles.intructionTextNoMargin}> Tap 'Definitely no' if you're sure you have not seen it. </Text>
            </View>

            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.buttonText} onPress={() => navigation.navigate(url, {
                    listIndex: listIndex
                })}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
    },
    headerText: {
        fontSize: 28
    },
    instructionText: {
        fontSize: 16,
        marginTop: '2%'
    },
    intructionTextNoMargin: {
        fontSize: 16
    },
    nextButton: {
        position: 'relative',
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

export default InstructionsDemo1