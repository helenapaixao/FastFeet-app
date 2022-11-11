import React, { useEffect, useState, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'

export default function App() {
  const [isSplashReady, setSplashReady] = useState(false);

useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // handle any exceptions
      } finally {
        setSplashReady(true);
      }
    }
    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (isSplashReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [isSplashReady]);

  if (!isSplashReady) {
    return null;
  }


  return (
    <View style={styles.container } onLayout={onLayoutRootView}   >
      <Text>FastFeet</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#545',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
