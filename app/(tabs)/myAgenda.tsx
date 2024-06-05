import { StyleSheet, Image, View, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { storage } from '../util/storage';
import { User } from '../@type/User';
import { MyAgendaUser } from '../screen/myAgendaUser';

import * as React from 'react';
import { List, MD3Colors, Avatar } from 'react-native-paper';

export default function MyAgenda() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user: User = await storage.load({ key: 'user' });
        setUser(user);
        console.log(user);
      } catch (e) {
        console.log('No user data found');
      }
    })();
  }, []);

  if (user?.role !== 'ADMIN') {
    return <MyAgendaUser />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<TabBarIcon name="people-circle" color="black" />}
    >
      <ThemedText type="title">Agendamentos</ThemedText>

      <ThemedView style={{ backgroundColor: 'transparent' }}>
        <ThemedText>Agendamentos por mês</ThemedText>
      </ThemedView>

      <ThemedText type="title">Junho</ThemedText>
      <List.Section style={{ backgroundColor: MD3Colors.secondary95 }}>
        <List.AccordionGroup>
          <List.Accordion
            style={styles.listAccordion}
            title="Juriscreusa Santana - 12/06/2024 - 14:00"
            description="R$ 229.97"
            id="1"
            left={() => (
              <Avatar.Image
                size={34}
                source={require('@/assets/images/galeria8.png')}
              />
            )}
          >
            <List.Item title="Corte de Cabelo" description="R$ 49.99" />
            <List.Item title="Coloração" description="R$ 149.99" />
            <List.Item title="Manicure" description="R$ 29.99" />
            {/* horario */}
            <List.Item title="Horário" description="12/06/2024 - 14:00" />
          </List.Accordion>

          <List.Accordion
            style={styles.listAccordion}
            title="Maria Sedosa - 12/06/2024 - 14:00"
            id="2"
            left={() => (
              <Avatar.Image
                size={34}
                source={require('@/assets/images/galeria4.png')}
              />
            )}
          >
            <List.Item title="Manicure" description="R$ 30" />
            <List.Item title="Limpeza de Pele" description="R$ 79.99" />
            {/* horario */}
            <List.Item title="Horário" description="12/06/2024 - 16:00" />
          </List.Accordion>
        </List.AccordionGroup>
      </List.Section>

      <ThemedText type="title">Julho</ThemedText>
      <List.Section style={{ backgroundColor: MD3Colors.secondary95 }}>
        <List.AccordionGroup>
          <List.Accordion
            style={styles.listAccordion}
            title="Jananderson - 12/06/2024 - 14:00"
            description="R$ 229.97"
            id="1"
            left={() => (
              <Avatar.Image
                size={34}
                source={require('@/assets/images/galeria8.png')}
              />
            )}
          >
            <List.Item title="Corte de Cabelo" description="R$ 49.99" />
            <List.Item title="Coloração" description="R$ 149.99" />
            <List.Item title="Manicure" description="R$ 29.99" />
            {/* horario */}
            <List.Item title="Horário" description="12/06/2024 - 14:00" />
          </List.Accordion>
        </List.AccordionGroup>
      </List.Section>

      <Image
        source={require('@/assets/images/vector3.png')}
        style={styles.assets}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  listAccordion: {
    paddingHorizontal: 8,
  },
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
