import { StyleSheet, Image } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Carousel } from '@/components/Carousel';
import { useEffect, useState } from 'react';
import { CustomImage } from '@/components/CustomImage';

import { galeria } from '@/constants/Galeria';

import galeria1 from '@/assets/images/galeria1.png';
import galeria2 from '@/assets/images/galeria2.png';
import galeria3 from '@/assets/images/galeria3.png';
import galeria4 from '@/assets/images/galeria4.png';
import galeria5 from '@/assets/images/galeria5.png';
import galeria6 from '@/assets/images/galeria6.png';
import galeria7 from '@/assets/images/galeria7.png';
import galeria8 from '@/assets/images/galeria8.png';

const imageMap = {
  'galeria1.png': galeria1,
  'galeria2.png': galeria2,
  'galeria3.png': galeria3,
  'galeria4.png': galeria4,
  'galeria5.png': galeria5,
  'galeria6.png': galeria6,
  'galeria7.png': galeria7,
  'galeria8.png': galeria8,
};
type ImageKey = keyof typeof imageMap;

export default function TabTwoScreen() {
  // loop para mudar as imagens do carousel
  const images = [1, 2, 3];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Carousel id={currentIndex} />}
    >
      <ThemedText type="title">Galeria</ThemedText>

      <ThemedView style={{ backgroundColor: 'transparent' }}>
        <ThemedText>Venha conhecer nossa loja fisica!</ThemedText>
        <ThemedText>
          Estamos localizados na Rua Tal, 4002-8922, Centro, Caxias - MA
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.galeria}>
        {galeria.map((item) => (
          <CustomImage
            key={item.id}
            myId={item.id.toString()}
            source={imageMap[item.source as ImageKey]}
          />
        ))}
      </ThemedView>

      <Image
        source={require('@/assets/images/vector3.png')}
        style={styles.assets}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  galeria: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  assets: {
    flex: 1,
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
    objectFit: 'contain',

    opacity: 0.5,
    position: 'absolute',
    top: -80,
    right: -10,
    zIndex: -1,
  },
});
