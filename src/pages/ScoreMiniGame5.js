// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";

// // Get the screen dimensions
// const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// const ScoreMiniGame5 = ({ navigation, score }) => {
//   // Determine the feedback message based on the score
//   const getFeedbackMessage = (score) => {
//     if (score === 400) {
//       return "Excellent work!";
//     } else if (score >= 300 && score < 400) {
//       return "Great job!";
//     } else if (score >= 200 && score < 300) {
//       return "Good effort!";
//     } else {
//       return "Keep practicing!";
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Display the feedback message and score */}
//       <View style={[styles.scoreCard, { width: screenWidth * 0.7, height: screenHeight * 0.7 }]}>
//         <Text style={styles.title}>{getFeedbackMessage(score)}</Text>
//         <Text style={styles.scoreText}>{`Your Score: ${score} / 400`}</Text>

//         {/* Button to return to the home page */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("landing")}
//         >
//           <Text style={styles.buttonText}>Home Page</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f7f9fc", // Light background for better contrast
//   },
//   scoreCard: {
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     padding: 0, // Remove padding to ensure exact 70% size
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//     elevation: 10,
//     alignItems: "center",
//     justifyContent: "center", // Center content within the scoreCard
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//     textAlign: "center",
//   },
//   scoreText: {
//     fontSize: 24,
//     color: "blue",
//     fontWeight: "bold",
//     marginBottom: 25,
//   },
//   button: {
//     backgroundColor: "#0047AB", // Blue button
//     padding: 15,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default ScoreMiniGame5;
