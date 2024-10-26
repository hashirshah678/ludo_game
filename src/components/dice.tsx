import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "../utils/GetIcons";
import LottieView from "lottie-react-native";
import DiceRoll from "../../assets/animation/diceroll.json";
import Arrow from "../../assets/images/arrow.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPlayerChance,
  selectDiceNo,
  selectDiceRolled,
} from "../redux/reducers/gameSelectors";
import {
  enableCellSelection,
  enablePileSelection,
  updateDiceNo,
  updatePlayerChance,
} from "../redux/reducers/gameSlice";
import { playSound } from "../utils/SoundUtility";

type Color = string;

interface props {
  color: Color;
  rolate?: number;
  player: number;
  data: any;
}

const Dice = React.memo(({ color, rolate, player, data }: props) => {
  const dispatch = useDispatch();
  const currentPlayerChance = useSelector(selectCurrentPlayerChance);
  const isDiceRolled = useSelector(selectDiceRolled);
  const diceNo = useSelector(selectDiceNo);
  const pileIcon = BackgroundImage.GetImage(color);
  const diceIcon = BackgroundImage.GetImage(diceNo);
  const arrowAnim = useRef(new Animated.Value(0)).current;
  const playerPieces = useSelector(
    (state: any) => state.game[`players${currentPlayerChance}`]
  );

  const [diceRolling, setDiceRolling] = useState(false);

  useEffect(() => {
    const animateArrow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(arrowAnim, {
            toValue: 10,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(arrowAnim, {
            toValue: -10,
            duration: 600,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    animateArrow();
    return () => {};
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDicePress = async () => {
    const newDiceNo = Math.floor(Math.random() * 6) + 1;
    playSound("dice_roll")
    setDiceRolling(true);
    await delay(600);
    dispatch(updateDiceNo(newDiceNo)); //like to store diceno1,2,3,4,5,6 to displace on sc.
    setDiceRolling(false);

    // it check piece is equal to 0 and 57, if yes then it means there is no piece alive return -1 otherwise it return 1
    const isAnyPieceAlive = data?.findIndex((i) => i.pos != 0 && i.pos != 57);
    const isAnyPieceLocked = data?.findIndex((i) => i.pos == 0);

    if (isAnyPieceAlive == -1) {
      if (newDiceNo === 6) {
        // if have 6 then he can select pife
        dispatch(enablePileSelection(player));
      } else {
        // otherwise chance go to next player
        let chancePlayer = player + 1;
        if (chancePlayer > 4) {
          // if chance is equal to 5 then it change into 1
          chancePlayer = 1;
        }
        await delay(600);
        dispatch(updatePlayerChance(chancePlayer)); // set chance to next player
      }
    } else {
      // in this case player have pife a live,means there have a files

      // Total travelCount = 57,
      // If pile TC is equal or less then 57, then he canMove otherwise he cannot move.
      // Also it current player pile is not equal to 0.
      const canMove = playerPieces.some(
        (pile) => pile.travelCount + newDiceNo <= 57 && pile.pos != 0
      );

      if (
        (!canMove && newDiceNo == 6 && isAnyPieceLocked == -1) || 
        (!canMove && newDiceNo != 6 && isAnyPieceLocked != -1) ||
        (!canMove && newDiceNo != 6 && isAnyPieceLocked == -1)
      ) {
        // if it not move then
        let chancePlayer = player + 1;
        if (chancePlayer > 4) {
          chancePlayer = 1;
        }
        await delay(600);
        dispatch(updatePlayerChance(chancePlayer));
        return;
      }

      if(newDiceNo==6) {
        dispatch(enablePileSelection(player))
      }
      dispatch(enableCellSelection(player))
    }
  };

  return (
    <View
      style={[styles.flexRow, { transform: [{ scaleX: rolate ? -1 : 1 }] }]}
    >
      <View style={styles.border1}>
        <LinearGradient
          style={styles.LinearGradient}
          colors={["#0052be", "#5f9fcb", "#97c6c9"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.pileContainer}>
            <Image source={pileIcon} style={styles.pileIcon} />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.border2}>
        <LinearGradient
          style={styles.diceGradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={["#aac8ab", "#aac8ab", "#aac8ab"]}
        >
          <View style={styles.diceContainer}>
            {currentPlayerChance === player && !diceRolling && (
              <TouchableOpacity
                disabled={isDiceRolled}
                activeOpacity={0.4}
                onPress={handleDicePress}
              >
                <Image source={diceIcon} style={styles.dice} />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </View>
      {currentPlayerChance === player && !isDiceRolled && (
        <Animated.View style={{ transform: [{ translateX: arrowAnim }] }}>
          <Image source={Arrow} style={styles.Arrow} />
        </Animated.View>
      )}

      {currentPlayerChance === player && diceRolling && (
        <LottieView
          source={DiceRoll}
          style={styles.rollingDice}
          loop={false}
          autoPlay
          cacheComposition={true}
          hardwareAccelerationAndroid
        />
      )}
    </View>
  );
});

export default Dice;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  border1: {
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: "#f0ce2c",
  },
  border2: {
    borderWidth: 3,
    padding: 1,
    backgroundColor: "#aac8ab",
    borderRadius: 10,
    borderLeftWidth: 3,
    borderColor: "#aac8ab",
  },
  LinearGradient: {},
  pileIcon: {
    width: 33,
    height: 35,
  },
  pileContainer: {
    paddingHorizontal: 3,
  },
  diceGradient: {
    borderWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#f0ce2c",
    justifyContent: "center",
    alignItems: "center",
  },
  diceContainer: {
    backgroundColor: "#e8c0c1",
    borderWidth: 1,
    width: 55,
    borderRadius: 5,
    height: 55,
    paddingHorizontal: 8,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  dice: {
    height: 45,
    width: 45,
  },
  rollingDice: {
    height: 80,
    width: 80,
    position: "absolute",
    top: -25,
    zIndex: 99,
  },
  Arrow: {
    width: 50,
    height: 30,
  },
});
