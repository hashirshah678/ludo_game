import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import Plote from "./plote";
import { useDispatch } from "react-redux";
import { GameState } from "../redux/reducers/initialState";

type Color = string;

interface props {
  color: Color;
  player: number;
  data:any;
}

const Pocket = React.memo(({ color, player ,data}: props) => {

  const dispatch = useDispatch();
  const handlePress = async(value:GameState)=>{
    let playerNo = value.id[0]
    switch (playerNo) {
      case 'A':
        playerNo = 'player1'
        break;
      case 'B':
        playerNo = 'player2'
        break;
      case 'C':
        playerNo = 'player3'
        break;
      case 'D':
        playerNo = 'player4'
        break;
      default:
        console.warn("Some thing is wrong plz! wait for futherUpdata")
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.childFrame}>
        <View style={styles.flexRow}>
            <Plote color={color} player={player} pieceNo={0} />
            <Plote color={color} player={player} pieceNo={1} />
        </View>

        <View style={[styles.flexRow,{marginTop:20}]}>
            <Plote color={color} player={player} pieceNo={3} />
            <Plote color={color} player={player} pieceNo={4} />
        </View>
      </View>
    </View>
  );
});

export default Pocket;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "100%",
    backgroundColor: "green",
  },
  childFrame: {
    backgroundColor: "white",
    width: "70%",
    height: "70%",
    borderColor: Colors.borderColor,
    borderWidth: 0.5,
    padding: 15,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "40%",
  },
});
