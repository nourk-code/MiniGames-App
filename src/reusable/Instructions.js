// reusable/Instructions.js
import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from "react-native";
import React, { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';

const Instructions = ({ navigation, route, visible, onClose, extraText }) => {
    const { text, url } = route.params;

    const { width, height } = Dimensions.get('window'); // Get the screen dimensions

    useEffect(() => {
        // Lock the screen orientation to landscape
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        return () => {
            // Unlock all orientations when the component unmounts
            ScreenOrientation.unlockAsync();
        };
    }, []);

    // Define a base value to scale the text size
    const baseWidth = 400; // You can change this based on your design
    const scale = width / baseWidth;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose} // Use onClose to close the modal
        >
            <View style={styles.modalOverlay}>
                <View style={[
                    styles.modalContainer,
                    { width: width * 0.6, height: height * 0.6, maxHeight: height * 0.8 } // Adjust height if necessary
                ]}>
                    <Text style={[styles.headerText, { fontSize: 8 * scale }]}>
                        Instructions
                    </Text>
                    <Text style={[styles.instructionText, { fontSize: 5 * scale }]}>{text}</Text>
                    {extraText && (
                        <Text style={[styles.extraText, { fontSize: 5 * scale }]}>
                            {extraText}
                        </Text>
                    )}
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={() => {
                                if (url === 'game2') {
                                    navigation.navigate('game2', { questionIndex: 0, score: 0 });
                                } else {
                                    navigation.navigate(url); // For other screens, navigate normally
                                }
                                onClose(); // Close the modal
                            }}
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background with opacity
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 15, // Slightly larger radius for a softer look
        paddingVertical: 50, // Adjusted padding for a compact design
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between', // Ensure the buttons and text fit
        flexShrink: 1, // Shrinks content if it exceeds available space
    },
    headerText: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    instructionText: {
        marginTop: 10,
        textAlign: 'center',
        flexShrink: 1, // Allow text to shrink if necessary
    },
    extraText: {
        color: "black", 
        
        textAlign: 'center',
        fontStyle: 'italic', 
    },
    buttonWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 5, 
    },
    nextButton: {
        width: 100, // Adjust button size to fit smaller modals
        height: 40,
        backgroundColor: '#0047AB',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5, 
    },
    closeButton: {
        width: 100,
        height: 40,
        backgroundColor: '#0047AB', 
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5, 
    },
    buttonText: {
        fontSize: 16, 
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Instructions;
