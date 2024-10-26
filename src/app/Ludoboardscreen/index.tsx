import {
  Animated,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@/assets/images/menu.png";

import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import StartGame from "@/assets/images/start.png";
import Wrapper from "@/src/components/wrapper";
import { Colors } from "@/src/constants/Colors";
import Dice from "@/src/components/dice";
import Pocket from "@/src/components/pocket";
import VerticalPath from "@/src/components/verticalPath";
import {
  ploteData1,
  ploteData2,
  ploteData3,
  ploteData4,
} from "@/src/utils/PloteData";
import HorizontalPath from "@/src/components/horizontalPath";
import FourTrangles from "@/src/components/fourTrangles";
import { deviceHeight, deviceWidth } from "@/src/constants/Scaling";
import {
  selectDiceTouch,
  selectPlayer1,
  selectPlayer2,
  selectPlayer3,
  selectPlayer4,
  selectWinner,
} from "@/src/redux/reducers/gameSelectors";

// Red is a 1 player
// Green is a 2 player
// yellow is a 3 player
// Blue is a 4 player

const LudoBoardScreen = () => {
  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch = useSelector(selectDiceTouch);
  const winner = useSelector(selectWinner);

  const isFocused = useIsFocused();

  const [showStarImage, setShowStarImage] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;

  // useEffect(() => {
  //   if (isFocused) {
  //     setShowStarImage(true);
  //     const blinkAnimation = Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(opacity, {
  //           toValue: 0,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //         Animated.timing(opacity, {
  //           toValue: 1,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //       ])
  //     );

  //     blinkAnimation.start();

  //     const timeout = setTimeout(()=>{
  //       blinkAnimation.stop();
  //       setShowStarImage(false)
  //     }, 2500)

  //     return () => {
  //       clearTimeout(timeout)
  //     };
  //   }
  // }, [isFocused]);

  return (
    <Wrapper>
      <TouchableOpacity style={styles.MenuIconBotton}>
        <Image source={MenuIcon} style={styles.MenuIcon} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Dice color={Colors.green} data={player2} player={2}   />
          <Dice color={Colors.yellow} data={player3} player={3} rolate={1} />
        </View>

        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} data={player2} />
            <VerticalPath color={Colors.yellow} cells={ploteData2} player={0} />
            <Pocket color={Colors.yellow} player={3} data={player3}/>
          </View>

          <View style={styles.horiPathConatiner}>
            <HorizontalPath cells={ploteData1} color={Colors.green} />
            <FourTrangles />
            <HorizontalPath cells={ploteData3} color={Colors.blue} />
          </View>

          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} data={player1} />
            <VerticalPath color={Colors.red} cells={ploteData4} player={0} />
            <Pocket color={Colors.blue} player={4} data={player4}/>
          </View>
        </View>

        <View style={styles.flexRow}>
          <Dice color={Colors.red} data={player1} player={1} />
          <Dice color={Colors.blue} data={player2} player={4} rolate={1} />
        </View>
      </View>
      {/* Show blinking animation  */}

      {showStarImage && (
        <Animated.Image
          source={StartGame}
          style={[styles.StartImage, { opacity }]}
        />
      )}
    </Wrapper>
  );
};

export default LudoBoardScreen;

const styles = StyleSheet.create({
  MenuIconBotton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  MenuIcon: {
    width: 30,
    height: 30,
  },
  container: {
    alignSelf: "center",
    justifyContent: "center",
    height: deviceHeight * 0.5,
    width: deviceWidth,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  ludoBoard: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    padding: 10,
  },
  plotContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
    backgroundColor: "#ccc",
    flexDirection: "row",
  },
  horiPathConatiner: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    justifyContent: "space-between",
    backgroundColor: "#1E5162",
  },
  StartImage: {
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.2,
    position: "absolute",
  },
});
