import { StyleProp, ImageStyle, ImageProps } from 'react-native';

export interface CustomImageProps extends ImageProps {
  myId: string;
  // source: ImageProps['source'];
  source: any;

  style?: StyleProp<ImageStyle>;
}
