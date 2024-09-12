import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const CameraScreen = () => {
    const cameraRef = useRef(null);

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri);
            detectPupilIris(data.uri);
        }
    };

    const detectPupilIris = async (uri) => {
        await tf.ready();
        // Model loading code commented out for now
        // const modelJson = require('./model/model.json');
        // const modelWeights = require('./model/weights.bin');
        // const model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));

        // Logging image URI for now
        console.log(uri);

        // Example of image processing would go here
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={RNCamera.Constants.Type.front}
                captureAudio={false}
            >
                <View style={styles.captureContainer}>
                    <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                        <Text style={styles.captureText}>CAPTURE</Text>
                    </TouchableOpacity>
                </View>
            </RNCamera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    captureButton: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    captureText: {
        fontSize: 14,
    },
});

export default CameraScreen;
