// elements/Circles.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Circles = ({ showOneBall }) => {
  return (
    <>
      {showOneBall == 1 &&
        <View style={styles.circleContainer}>
          <TouchableOpacity style={{ height: '100%', width: '45%' }}>
          </TouchableOpacity>
          <View style={styles.circle}>
          </View>
          <TouchableOpacity style={{ height: '100%', width: '45%' }}>
          </TouchableOpacity>
        </View>
      }

      {showOneBall == 0 &&
        <>
          <TouchableOpacity style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
          </TouchableOpacity>
          <View style={[styles.circleContainer, styles.gapTen]}>
            <View style={styles.circle}>
            </View>
            <View style={styles.circle}>
            </View>
          </View>
        </>
      }
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  initialBar: {
    width: '95%',
    backgroundColor: 'grey',
    position: "absolute",
    top: 10,
    left: 5
  },
  bar: {
    position: 'relative',
    width: '100%',
    height: 20,
    backgroundColor: 'blue',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  gapTen: {
    gap: 10
  },
  circle: {
    backgroundColor: 'blue',
    borderRadius: 50,
    height: 100,
    width: 100
  }
})

export default Circles;