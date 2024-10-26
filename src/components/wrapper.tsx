import { ImageBackground, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode } from 'react'
import BG from '../../assets/images/bg.jpg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { deviceHeight, deviceWidth } from '../constants/Scaling'

const Wrapper = ({children, style}:{children:ReactNode,style?:StyleProp<ViewStyle>}) => {
  return (
    <ImageBackground source={BG} resizeMode='cover' style={styles.container}>
      <SafeAreaView style={[styles.safeArea,style]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Wrapper

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  safeArea:{
    width:deviceWidth,
    height:deviceHeight,
    justifyContent:"center",
    alignItems:"center"
  }
})