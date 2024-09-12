// page/DemoGame1.js
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { euclideans } from "../utils/euclideans";
import Instructions from "../reusable/Instructions";
import InstructionsDemo1 from "./InstructionsDemo1";
import MiniGame1 from "./MainGame1";
const DemoGame1 = ({ navigation }) => {
  const [showDemo, setShowDemo] = useState(true);
  const [shapeIndex, setShapeIndex] = useState(-1);
  const [imgCount, setImageCount] = useState(0);
  const [listIndex, setListIndex] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    let intervalId;

    const showNextImage = () => {
      const newIndex = Math.floor(Math.random() * euclideans.length);
      if (!listIndex.includes(newIndex)) {
        setShapeIndex(newIndex);
        setListIndex([...listIndex, newIndex]);
      } else {
        showNextImage();
      }
    };

    if (listIndex.length < 4) {
      intervalId = setInterval(showNextImage, 4000);
    } else {
      setShowInstructions(true);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [listIndex]);

  return (
    <>
      {
        listIndex.length < 4 &&
        <View style={styles.container}>
          {shapeIndex != -1 && <Image style={styles.img} source={euclideans[shapeIndex].url} />}
        </View>
      }
      {
        listIndex.length >= 4 &&
        <InstructionsDemo1 url={'game1'} navigation={navigation}
          listIndex={listIndex} />
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    flex: 1
  },
  img: {
    height: '50%',
    width: '40%',
  }
})

export default DemoGame1;