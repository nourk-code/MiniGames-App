// reusable/Instructions.js
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import React, { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';

const Instructions = ({ navigation, route, visible, onClose }) => {
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose} // Use onClose to close the modal
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.headerText}>
                        Instructions
                    </Text>
                    <Text style={styles.instructionText}>{text}</Text>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.nextButton} onPress={() => {
                            navigation.navigate(url);
                            onClose(); // Close the modal and navigate to the next screen
                        }}>
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
        width: '60%', // Smaller width for modal
        backgroundColor: 'white',
        borderRadius: 15, // Slightly larger radius for a softer look
        paddingVertical: 60, // Reduced padding for a compact design
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 27, // Slightly smaller font size
        marginBottom: 15,
        fontWeight: 'bold',
    },
    instructionText: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    buttonWrapper: {
        flexDirection: 'row', // Row direction for buttons side by side
        justifyContent: 'space-between', // Add space between the buttons
        marginTop: 60, // Margin from the text above
    },
    nextButton: {
        width: 120,
        height: 50,
        backgroundColor: '#0047AB', // Use blue color for both buttons
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Slightly larger radius for a modern look
        marginHorizontal: 5, // Space between the buttons
    },
    closeButton: {
        width: 120,
        height: 50,
        backgroundColor: '#0047AB', // Use blue color for the close button as well
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5, // Space between the buttons
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Instructions;
