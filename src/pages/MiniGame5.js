import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';

const Game5 = ({ navigation }) => {
    const [squareIndex, setSquareIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const initialSquareSize = 105;
    const sizeDecrement = 5;

    useEffect(() => {
        const updateDimensions = () => {
            setScreenWidth(Dimensions.get('window').width);
            setScreenHeight(Dimensions.get('window').height);
        };

        // Add an event listener for orientation changes or window resizing
        const subscription = Dimensions.addEventListener('change', updateDimensions);

        return () => {
            // Clean up the event listener when the component unmounts
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        let interval;

        const showSquare = () => {
            if (squareIndex >= 9) {
                clearInterval(interval);
                return;
            }
            setSquares(prevSquares => {
                let updatedSize = prevSquares.length > 0 ? prevSquares[0].size - sizeDecrement : initialSquareSize;
                const x = Math.random() * (screenWidth - updatedSize);
                const y = Math.random() * (screenHeight - updatedSize);
                return [{ size: updatedSize, x, y }];
            });
            setSquareIndex(prevIndex => prevIndex + 1);
        };

        interval = setInterval(showSquare, 1000);

        return () => clearInterval(interval);
    }, [squareIndex, screenWidth, screenHeight]);

    const [squares, setSquares] = useState([]);

    const handleSquarePress = () => {
        setSquares([]);
        setScore(prevScore => prevScore + 50);
    };

    const getScoreMessage = () => {
        if (score === 400) {
            return 'Excellent work!';
        } else if (score >= 300) {
            return 'Great job!';
        } else if (score >= 200) {
            return 'Good effort!';
        } else {
            return 'Keep practicing!';
        }
    };

    return (
        <View style={styles.container}>
            {squareIndex < 9 && squares.map((square, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.square, { width: square.size, height: square.size, top: square.y, left: square.x }]}
                    onPress={handleSquarePress}
                />
            ))}
            {squareIndex >= 9 && (
                <View style={[styles.scoreContainer, { width: screenWidth * 0.6, height: screenHeight * 0.6 }]}>
                    <Text style={styles.score}>Your Score: {score}/400</Text>
                    <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('landing')}>
                        <Text style={styles.buttonText}>Home Page</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    square: {
        position: 'absolute',
        backgroundColor: '#1e90ff',
        borderRadius: 10,
    },
    scoreContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        padding: 20, // Padding to improve spacing
    },
    score: {
        fontSize: 24,  // Smaller text size
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    scoreMessage: {
        fontSize: 20,  // Smaller text size
        color: '#555',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0047AB',
        paddingVertical: 12,  // Smaller padding
        paddingHorizontal: 30,  // Smaller padding
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,  // Smaller text size
        fontWeight: 'bold',
    },
});

export default Game5;
