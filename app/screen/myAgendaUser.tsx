import {
  StyleSheet,
  Image,
  FlatList,
  ImageSourcePropType,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Carousel } from '@/components/Carousel';
import { useEffect, useState } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { storage } from '../util/storage';
import { TUser } from '../@type/User';

export const MyAgendaUser = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<TabBarIcon name="people-circle" color="black" />}
    >
      <ThemedText type="title">Meus Agendamentos</ThemedText>

      <ThemedView style={{ backgroundColor: 'transparent' }}>
        <ThemedText>
          Você ainda não tem nenhum agendamento, clique no botão abaixo para
          agendar um horário com um de nossos especialistas.
        </ThemedText>
      </ThemedView>

      <Image
        source={require('@/assets/images/vector3.png')}
        style={styles.assets}
      />
    </ParallaxScrollView>
  );
};

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
