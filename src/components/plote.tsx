import { PixelRatio, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pife from './pife'
import { Colors } from '../constants/Colors'

type Colors = string

interface props{
    color:Colors,
    player:number,
    pieceNo:number
}

const Plote = ({color,pieceNo,player}:props) => {
  return (
    <View style={[styles.plote,{backgroundColor:color}]}>
      <Pife color={color} player={player} cell={false}/>
    </View>
  )
}

export default Plote

const styles = StyleSheet.create({
    plote:{
        height:"80%",
        // height:"80%", if change in plote shape then setting this line 
        width:"36%",
        borderRadius:120 ,
    }
})