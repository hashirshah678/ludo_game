import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { BackgroundImage } from "../utils/GetIcons";
import { Color } from "../constants/Colors";
import { Svg, Circle } from 'react-native-svg';

interface props {
  color: Color;
  player: number;
  cell:boolean,
  pieceId?:number,
  onPress?:VoidFunction
}

const Pife = ({ color,cell,player ,onPress,pieceId}: props) => {
  const rolation = useRef(new Animated.Value(0)).current;

  const pifeImage = BackgroundImage.GetImage(color);

  useEffect(() => {
    const rolationAnimation = Animated.loop(
      Animated.timing(rolation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rolationAnimation.start();

    return () => rolationAnimation.stop();
  }, [rolation]);

  const rolateInterpolate = useMemo(
    () =>
      rolation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      }),
    [rolation]
  );

  return (
    <TouchableOpacity style={styles.pifeContainer}>
      <View style={styles.hollowCircle}>
        <View style={styles.dashedCircleContainer}>
          <Animated.View style={[styles.dashedCircle, { transform: [{rotate:rolateInterpolate}] }]}>
            <Svg height="18" width="18">
              <Circle
                cx={9}
                cy={9}
                r={8}
                stroke={"white"}
                strokeWidth={"2"}
                strokeDasharray={"4 4"}
                strokeDashoffset={"0"}
                fill={"transparent"}
              />
            </Svg>
          </Animated.View>
        </View>
      </View>
      <Image source={pifeImage} style={styles.PifeImage} />
    </TouchableOpacity>
  );
};

export default Pife;

const styles = StyleSheet.create({
    pifeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  PifeImage: {
    width: 32,
    height: 32,
    position: "absolute",
    top: -10,
  },
  hollowCircle: {
    width: 15,
    height: 15,
    position: "absolute",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  dashedCircleContainer: {},
  dashedCircle: {},
});
