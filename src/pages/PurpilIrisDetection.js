import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as blazeface from '@tensorflow-models/blazeface';

const PupilIrisDetection = ({ navigation }) => {
    const [model, setModel] = useState(null);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        const loadBlazefaceModel = async () => {
            try {
                await tf.ready();
                const blazefaceModel = await blazeface.load();
                setModel(blazefaceModel);
                console.log('Blazeface model loaded successfully');
            } catch (error) {
                console.error('Error loading Blazeface model:', error);
                setLoadingError('Failed to load Blazeface model');
            }
        };

        loadBlazefaceModel();
    }, []);

    const processImage = async () => {
        try {
            if (!model) {
                console.error('Blazeface model not loaded yet');
                return;
            }

            // Image processing logic here...
        } catch (error) {
            console.error('Error processing image:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/face2.jpeg')} style={styles.img} />
            {loadingError ? (
                <Text style={styles.errorText}>{loadingError}</Text>
            ) : (
                <TouchableOpacity
                    style={styles.capture}
                    onPress={processImage}>
                    <Text style={styles.buttonText}>Process Image</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    capture: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
    },
    buttonText: {
        fontSize: 14,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default PupilIrisDetection;
