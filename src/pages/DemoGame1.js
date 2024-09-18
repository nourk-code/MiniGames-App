// pages/DemoGame1.js
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Button } from "react-native";
import { euclideans } from "../utils/euclideans";
import InstructionsDemo1 from "./InstructionsDemo1";

const DemoGame1 = ({ navigation }) => {
  const [shapeIndex, setShapeIndex] = useState(-1);
  const [listIndex, setListIndex] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (listIndex.length >= 3) {
      // Delay the instructions screen by 4 seconds to show the last image fully
      const instructionsTimeout = setTimeout(() => {
        console.log("Setting showInstructions to true");
        setShowInstructions(true);
      }, 4000);

      return () => clearTimeout(instructionsTimeout);
    }

    const showNextImage = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * euclideans.length);
      } while (listIndex.includes(newIndex)); // Ensure the new index is unique

      setShapeIndex(newIndex);
      setListIndex((prevList) => [...prevList, newIndex]); // Update the list with the new index
    };

    const timeoutId = setTimeout(showNextImage, 4000);
    return () => clearTimeout(timeoutId);
  }, [listIndex]);

  // Debugging: Log state updates
  useEffect(() => {
    console.log("List Index Length:", listIndex.length);
    console.log("Current List Index:", listIndex);
    console.log("Current Shape Index:", shapeIndex);
  }, [listIndex, shapeIndex]);

  

  return (
    <>
      {!showInstructions ? (
        <View style={styles.container}>
          {shapeIndex !== -1 && (
            <Image style={styles.img} source={euclideans[shapeIndex].url} />
          )}
        </View>
      ) : (
        <InstructionsDemo1
          url={"game1"}
          navigation={navigation}
          listIndex={listIndex}
        />
      )}
      {showInstructions }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  img: {
    height: "50%",
    width: "40%",
  },
});

export default DemoGame1;
