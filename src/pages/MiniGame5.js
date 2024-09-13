import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';

const Game5 = ({ navigation }) => {
    const [squareIndex, setSquareIndex] = useState(0);
    const [score, setScore] = useState(0);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const initialSquareSize = 105;
    const sizeDecrement = 5;

    useEffect(() => {
        let interval;
        let size = initialSquareSize;

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
    }, [squareIndex]);

    const [squares, setSquares] = useState([]);


    const handleSquarePress = (indexToRemove) => {
        setSquares(prevSquares => prevSquares.filter((_, index) => index !== indexToRemove));
        setScore(prevScore => prevScore + 50);
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
                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>Your Score: {score}</Text>
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
    },
    square: {
        position: 'absolute',
        backgroundColor: 'blue',
    },
    scoreContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
    score: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

export default Game5;