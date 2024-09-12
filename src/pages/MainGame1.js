//pages/ MiniGame1.js
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { euclideans } from "../utils/euclideans";
import Score from "./Score";
const MiniGame1 = ({ navigation, route }) => {
    const { listIndex } = route.params;
    const [index, setIndex] = useState(Math.floor(Math.random() * euclideans.length))
    const [score, setScore] = useState(0);
    const [turn, setTurn] = useState(0);

    useEffect(() => {
        if (listIndex.length > 3) {
            listIndex.pop()
        }
    })

    const definetlyYes = () => {
        if (listIndex.includes(index)) {
            setScore(score + 50)
        } else {
            setScore(score - 50)
        }
        turnAndIndex()
    }

    const definetlyNo = () => {
        if (!listIndex.includes(index)) {
            setScore(score + 50)
        } else {
            setScore(score - 50)
        }
        turnAndIndex()
    }

    const probablyYes = () => {
        if (listIndex.includes(index)) {
            setScore(score + 25)
        } else {
            setScore(score - 25)
        }
        turnAndIndex()
    }

    const probablyNo = () => {
        if (!listIndex.includes(index)) {
            setScore(score + 25)
        } else {
            setScore(score - 25)
        }
        turnAndIndex()
    }

    const turnAndIndex = () => {
        setTurn(turn + 1);
        setIndex(Math.floor(Math.random() * euclideans.length))
    }

    return (
        <>
            {turn < 5 &&
                <View style={styles.container}>
                    <View style={{ width: '100%', height: '70%', paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <Image style={styles.img} source={euclideans[index].url} />
                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
                        height: '25%', width: '100%', paddingHorizontal: 10
                    }}>
                        <TouchableOpacity style={styles.button} onPress={() => definetlyYes()}>
                            <Text style={styles.text}>Definitely Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => probablyYes()}>
                            <Text style={styles.text}>Probably Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => probablyNo()}>
                            <Text style={styles.text}>Probably No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => definetlyNo()}>
                            <Text style={styles.text}>Definitely No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {turn >= 5 &&
                <Score navigation={navigation} score={score} />
            }
        </>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        width: '50%',
        height: '100%'
    },
    button: {
        height: '100%',
        width: '20%',
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 18
    }

})

export default MiniGame1;