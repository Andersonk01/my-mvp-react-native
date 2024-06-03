import React from 'react';
import { DimensionValue, Image, StyleSheet } from 'react-native';
import { CustomImageProps } from '@/app/@type/CustomImageProps';

export const CustomImage: React.FC<CustomImageProps> = ({
  myId,
  source,
  style,
  ...rest
}) => {
  return (
    <Image key={myId} source={source} style={[styles.image, style]} {...rest} />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 210,
    borderRadius: 8,
    minWidth: 110,

    width: 100 as DimensionValue,
    marginBottom: 8,

    objectFit: 'cover',
  },
});
