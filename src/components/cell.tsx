import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { Color, Colors } from "../constants/Colors";
import Pife from "./pife";
import { RFValue } from "react-native-responsive-fontsize";
import { ArrowSports, SafeSport, StarSports } from "../utils/PloteData";
import { ArrowRightIcon, StarIcon } from "react-native-heroicons/outline";

interface props {
  cell: boolean;
  id: number;
  color: Color;
}

const Cell = ({ cell, id, color }: props) => {
  const isSafeSport = useMemo(() => SafeSport.includes(id), [id]);
  const isStarSport = useMemo(() => StarSports.includes(id), [id]);
  const isArrowSport = useMemo(() => ArrowSports.includes(id), [id]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isSafeSport ? color : "white" },
      ]}
    >
      {/* <Pife 
        color={color}
        player={5}
        cell={true}
        pieceId={2}
        onPress={()=>{}}
      /> */}
      {isStarSport && <StarIcon size={20} color={"grey"} />}
      {isArrowSport && (
        <ArrowRightIcon
          size={RFValue(12)}
          color={"grey"}
          style={{
            transform: [
              {
                rotate:
                  id === 38
                    ? "180deg"
                    : id == 25
                    ? "90deg"
                    : id == 51
                    ? "-90deg"
                    : "0deg",
              },
            ],
          }}
        />
      )}
      {/* <Text>{id}</Text>  */}
    </View>
  );
};

export default React.memo(Cell);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderWidth: 0.4,
    borderColor: Colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  peiceContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 99,
  },
});
