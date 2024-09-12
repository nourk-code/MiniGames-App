// pages/ScoreMiniGame4.js
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react';

const ScoreMiniGame4 = ({ navigation, score }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your Score is</Text>
            <Text style={[styles.text, { color: 'blue' }]}>{score}</Text>
            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate("intruction",
                    {
                        text: "Tap the screen with two fingers when you see one dot. Do NOT tap the screen when you see two dots. Use right hand.",
                        url: "game4Right"
                    })
                }
            >
                <Text style={styles.buttonText}>Home Page</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        fontSize: 34,
        alignItems: 'center'
    },
    button: {
        marginTop: 25,
        height: 100,
        width: 200,
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

export default ScoreMiniGame4;