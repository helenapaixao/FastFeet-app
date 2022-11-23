import React, { useEffect, useState, useCallback } from 'react'
import {ThemeProvider} from 'styled-components'
import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium
} from '@expo-google-fonts/inter'
import {
  Roboto_700Bold, Roboto_500Medium
} from '@expo-google-fonts/roboto'
import theme  from './src/theme/index'

import Login from './src/screens/Login';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Roboto_700Bold,
    Roboto_500Medium
  })



  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <ThemeProvider theme={theme}>
      <View 
      onLayout={onLayoutRootView}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <StatusBar
      backgroundColor="transparent"
      translucent={true}
      />
      <Login />
    </View>
    </ThemeProvider>
    
  );
}
