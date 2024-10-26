import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SplashScreenLayout = () => {
  return (
    <Stack
    screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen 
            name='index'
        />
    </Stack>
  )
}

export default SplashScreenLayout

const styles = StyleSheet.create({})