import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LudoBoardScreenLayout = () => {
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

export default LudoBoardScreenLayout

const styles = StyleSheet.create({})