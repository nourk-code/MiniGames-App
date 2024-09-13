
// import React, { useEffect, useState, useRef } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Score from "./Score";

// const MiniGame6 = ({ navigation }) => {
//     const maxScore = 500; // Maximum score for perfect reaction
//     const penalty = 20; // Penalty for early tap
//     const [score, setScore] = useState(0);
//     const [turn, setTurn] = useState(0);
//     const [isReady, setIsReady] = useState(false);
//     const [displayTime, setDisplayTime] = useState(null);
//     const timer = useRef(null);
//     const interval = useRef(null);

//     useEffect(() => {
//         startNewTurn();
//         return () => {
//             clearTimeout(timer.current);
//             clearInterval(interval.current);
//         };
//     }, []);

//     const startNewTurn = () => {
//         const randomDelay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 and 5 seconds
//         timer.current = setTimeout(() => {
//             setIsReady(true);
//             setDisplayTime(0);
//             const startTime = Date.now();
//             interval.current = setInterval(() => {
//                 setDisplayTime(Date.now() - startTime);
//             }, 1);
//         }, randomDelay);
//     };

//     const handleTap = () => {
//         if (isReady) {
//             clearInterval(interval.current);
//             const reaction = displayTime;
//             setIsReady(false);
//             const turnScore = Math.max(0, maxScore - reaction);
//             setScore(prevScore => prevScore + turnScore);
//             setTurn(turn + 1);
//             if (turn < 4) {
//                 setDisplayTime(null); // Reset display time
//                 startNewTurn();
//             }
//         } else {
//             setDisplayTime("Too early!");
//             setScore(prevScore => prevScore - penalty); // Early tap penalty
//         }
//     };

//     return (
//         <>
//             {turn < 5 && (
//                 <TouchableOpacity style={styles.container} onPress={handleTap}>
//                     <View style={styles.rect}>
//                         <Text style={styles.text}>
//                             {typeof displayTime === "number" ? displayTime : displayTime}
//                         </Text>
//                     </View>
//                 </TouchableOpacity>
//             )}

//             {turn >= 5 && <Score navigation={navigation} score={score} />}
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "black",
//     },
//     rect: {
//         width: 200,
//         height: 70,
//         borderColor: "red",
//         borderWidth: 2,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     text: {
//         color: "white",
//         fontSize: 30,
//     },
// });

// export default MiniGame6;


import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Score from "./Score";

const MiniGame6 = ({ navigation }) => {
    const [score, setScore] = useState(0);
    const [turn, setTurn] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [displayTime, setDisplayTime] = useState(null);
    const timer = useRef(null);
    const interval = useRef(null);

    useEffect(() => {
        startNewTurn();
        return () => {
            clearTimeout(timer.current);
            clearInterval(interval.current);
        };
    }, []);

    const startNewTurn = () => {
        const randomDelay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 and 5 seconds
        timer.current = setTimeout(() => {
            setIsReady(true);
            setDisplayTime(0);
            const startTime = Date.now();
            interval.current = setInterval(() => {
                setDisplayTime(Date.now() - startTime);
            }, 1);
        }, randomDelay);
    };

    const handleTap = () => {
        if (isReady) {
            clearInterval(interval.current);
            const reaction = displayTime;
            setIsReady(false);
            let turnScore = 0;
            if (reaction < 3000) {
                turnScore = 50;
            } else {
                turnScore = 30;
            }
            setScore(prevScore => prevScore + turnScore);
            setTurn(turn + 1);
            if (turn < 4) {
                setDisplayTime(null); // Reset display time
                startNewTurn();
            }
        } else {
            setDisplayTime("Too early!");
            setScore(prevScore => prevScore - 20); // Early tap penalty
        }
    };

    return (
        <>
            {turn < 5 && (
                <TouchableOpacity style={styles.container} onPress={handleTap}>
                    <View style={styles.rect}>
                        <Text style={styles.text}>
                            {typeof displayTime === "number" ? displayTime : displayTime}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}

            {turn >= 5 && <Score navigation={navigation} score={score} />}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // Changed background color to white
    },
    rect: {
        width: 200,
        height: 70,
        borderColor: "blue", // Changed border color to blue
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "blue", // Changed text color to blue
        fontSize: 30,
    },
});

export default MiniGame6;
