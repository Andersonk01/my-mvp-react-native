import { Image, StyleSheet, Platform, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WrapperAgendamento } from '@/components/WrapperAgendamento';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useEffect, useState } from 'react';
import { storage } from '../util/storage';
import { MyModal } from '@/components/MyModal';
import { PageEmployee } from '@/components/PageEmployee';

// {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
export default function HomeScreen() {
  const handleTest = () => Alert.alert('test');
  const [image, setImage] = useState<string | undefined>();

  const checkUser = async () => {
    try {
      const image = await storage.load({ key: 'image' });
      setImage(image);
      console.log('image image:', image);
    } catch (e) {
      console.log('No user data found');
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#1D3D47' }}
        headerImage={
          image ? (
            <Image source={{ uri: image }} style={styles.reactLogo} />
          ) : (
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.reactLogo}
            />
          )
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Beauty Salon</ThemedText>

          <ThemedText type="subtitle" style={{ marginTop: 20 }}>
            Agende o seu horário de forma rápida e fácil!
          </ThemedText>
        </ThemedView>

        <MyModal type="Serviços">
          <ThemedView style={{ marginTop: 40 }}>
            <WrapperAgendamento type="Serviços" />
          </ThemedView>
        </MyModal>

        <MyModal type="Funcionário">
          <ThemedView>
            <PageEmployee />
          </ThemedView>
        </MyModal>

        <MyModal type="Horário">
          <ThemedText>Modal</ThemedText>
        </MyModal>

        <Collapsible title="Aqui você vai envontrar os melhores serviços.">
          <ThemedText>
            Fique a vontate para explora:{' '}
            <ThemedText type="defaultSemiBold">Nossos produtos</ThemedText> e{' '}
            <ThemedText type="defaultSemiBold">Nossa pagina de feed</ThemedText>
          </ThemedText>
          <ThemedText>
            Caso precise de mais informações, siga-nos nas redes sociais: {'\n'}{' '}
            {'\n'}
            <TabBarIcon name="logo-instagram" size={18} />{' '}
            <TabBarIcon name="logo-facebook" size={18} />{' '}
            <TabBarIcon name="logo-linkedin" size={18} />{' '}
          </ThemedText>
          <ExternalLink href="https://anderson-kauer.vercel.app">
            <ThemedText type="link">Entre em contato conosco aqui!</ThemedText>
          </ExternalLink>
        </Collapsible>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    // borderBottomWidth: 1,
    width: '100%',
    padding: 10,
    // fontFamily: 'poppins',
  },
  reactLogo: {
    flex: 1,
    width: '100%',
    height: 410,
    zIndex: 999,
  },
});
