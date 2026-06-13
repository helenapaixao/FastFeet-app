import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

import { Container } from "./styles";

import LogoSymbol from "../../components/LogoSymbol";

type Props = {
  onFinish: () => void;
};

const PULSE_DURATION = 700;
const SPLASH_DURATION = 4000;

export default function Splash({ onFinish }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.25,
            duration: PULSE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: PULSE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: PULSE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: PULSE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulse.start();

    const timer = setTimeout(() => {
      pulse.stop();
      onFinish();
    }, SPLASH_DURATION);

    return () => {
      pulse.stop();
      clearTimeout(timer);
    };
  }, [onFinish, opacity, scale]);

  return (
    <Container>
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <LogoSymbol width={120} height={132} />
      </Animated.View>
    </Container>
  );
}
