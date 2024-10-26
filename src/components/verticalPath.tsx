import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { Color } from "../constants/Colors";
import Cell from "./cell";

interface props {
  color: Color;
  cells: Array<number>;
  player:number
}

const VerticalPath = React.memo(({ color, cells,player }: props) => {

  const groupCells = useMemo(() => {

    const groups = [];
    for (let i = 0; i < cells.length; i += 3) {
      const element = cells[i];
      groups.push(cells.slice(i, i + 3));
    }

    return groups;
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
});

export default VerticalPath;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
    height: "100%",
  },
  flexColumn: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  groupFlexRow: {
    flexDirection: "row",
    width: "33.3%",
    height: "16.7%",
  },
});
