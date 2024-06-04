import React, { useRef } from 'react';
import {
  Animated,
  DimensionValue,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { CustomImageProps } from '@/app/@type/CustomImageProps';

export const CustomImage: React.FC<CustomImageProps> = ({
  myId,
  source,
  style,
  ...rest
}) => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    transform: [{ translateY: shakeAnimation }],
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.Image
        key={myId}
        source={source}
        style={[styles.image, style, animatedStyle]}
        {...rest}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    // height: 210,
    borderRadius: 8,
    minWidth: 110,

    // width: 100 as DimensionValue,
    marginBottom: 8,

    objectFit: 'cover',
  },
});
//
