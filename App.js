

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './src/pages/LandingPage';
import MiniGame3 from './src/pages/MiniGame3';
import MiniGame4 from './src/pages/MiniGame4';
import MiniGame2 from './src/pages/MiniGame2';
import Instructions from './src/reusable/Instructions';
import MiniGame1 from './src/pages/MainGame1';
import DemoGame1 from './src/pages/DemoGame1';
import MiniGame5 from './src/pages/MiniGame5';
import MiniGame6 from './src/pages/MiniGame6';
import MiniGame4Right from './src/pages/MiniGame4Right';
import IrisDetection from './src/pages/IrisDetection';  // Adjust the path as needed



function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='landing'>
        <Stack.Screen name="landing" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="game5" component={MiniGame5} options={{ headerShown: false }} />
        <Stack.Screen name="game3" component={MiniGame3} options={{ headerShown: false }} />
        <Stack.Screen name="game4" component={MiniGame4} options={{ headerShown: false }} />
        <Stack.Screen name="game2" component={MiniGame2} options={{ headerShown: false }} />
        <Stack.Screen name="game1" component={MiniGame1} options={{ headerShown: false }} />
        <Stack.Screen name="IrisDetection" component={IrisDetection} options={{ headerShown: false }} />

        <Stack.Screen name="game6" component={MiniGame6} options={{ headerShown: false }} />
        <Stack.Screen name="intruction" component={Instructions} options={{ headerShown: false }} />
        <Stack.Screen name="demo1" component={DemoGame1} options={{ headerShown: false }} />
        {/* <Stack.Screen name="game4Right" component={MiniGame4Right} options={{ headerShown: false }} /> */}
        <Stack.Screen name="game4Right" component={MiniGame4Right} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
