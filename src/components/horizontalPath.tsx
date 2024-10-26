import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Color } from "../constants/Colors";
import Cell from "./cell";

interface props {
  cells: Array<number>;
  color: Color;
}

const HorizontalPath = ({ cells ,color}: props) => {
  const groupCells = React.useMemo(() => {
    let group = [];
    for (let i = 0; i < cells.length; i += 6) {
        console.log(i, i+6);
      group.push(cells.slice(i, i + 6));
    }
    return group;
  }, [cells]);

  return (
    <View style={styles.container}>
      <View style={styles.flexColumn}>
        {groupCells.map((group, groupIndex) => {
          return (
            <View key={`group=${groupIndex}`} style={styles.groupFlexRow}>
              {group.map((id) => {
                return (
                  <Cell key={`cell=${id}`} cell={true} id={id} color={color}/>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default HorizontalPath;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: "40%",
      height: "100%",
    },
    flexColumn: {
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    groupFlexRow: {
      flexDirection: "row",
      width: "16.7%",
      height: "33.3%",
    },
  });
  