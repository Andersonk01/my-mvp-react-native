import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { storage } from '../util/storage.js';

import '../../assets/images/logo.png';

import { Collapsible } from '@/components/Collapsible';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { EmployeeList } from '@/components/TableEmployee';

export default function ConfigScreen() {
  const router = useRouter();
  const [touglePage, setTouglePage] = useState<'user' | 'empresa'>('user');

  const [image, setImage] = useState<string | undefined>();
  const [secureEntery, setSecureEntery] = useState(true);

  // const usada para comparação de senha antiga com anterior
  const [UserControl, setUserControl] = useState<{
    name: string;
    password: string;
  } | null>({} as { name: string; password: string });

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    try {
      storage.remove({
        key: 'user',
      });
      router.replace('../screen/login');

      // await AsyncStorage.removeItem('user').then(() => {
      //   console.log('User data removed');
      // });
      // Navegue de volta para a tela de login ou qualquer outra tela apropriada
    } catch (e) {
      console.log('Failed to remove user data');
    }
  };

  const handleImageUpload = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        cameraType: ImagePicker.CameraType.back,
      });

      // canceled
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro ao carregar imagem: ' + error);
    }
  };

  const saveImage = async (image: string) => {
    try {
      setImage(image);
      storage.save({
        key: 'image',
        data: image,
        expires: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // atualizar imagem e usuario
  const checkUser = async () => {
    storage.load({ key: 'user' }).then((res) => {
      setName(res.name);
      setPassword(res.password);

      setUserControl(res as { name: string; password: string });
    });

    try {
      const urlImage = await storage.load({ key: 'image' });
      setImage(urlImage);
    } catch (e) {
      console.log('No image');
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleClearImage = async () => {
    try {
      storage.remove({
        key: 'image',
      });
      setImage(undefined);

      // await AsyncStorage.removeItem('image').then(() => {
      // });
    } catch (e) {
      console.log('Failed to remove user data');
    }
  };

  // atualizar usuario
  const handleUpdate = async () => {
    const IUser = {
      name: name,
      password: password,
    };

    if (name.trim() && password.trim()) {
      storage.save({
        key: 'user',
        data: IUser,
        expires: null,
      });

      Alert.alert('Dados atualizado', `${name}!`);
    } else {
      // console.error('Erro ao fazer login: Credenciais inválidas');
      Alert.alert('Nome ou senha inválidos.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <View style={styles.wrapperImage}>
          <View style={styles.touchImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.reactLogo}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.buttonImg}
            onPress={handleImageUpload}
          >
            <Ionicons name="add-sharp" size={30} color={'#353535'} />
          </TouchableOpacity>
        </View>
      }
    >
      <ThemedView
        style={{
          height: 50,
          width: '100%',
          margin: 'auto',
          flexDirection: 'row',
          padding: 10,
          marginTop: -20,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setTouglePage('user')}
        >
          <ThemedText
            style={[
              {
                flex: 1,
                textAlign: 'center',
              },
              touglePage === 'user' ? { color: 'green' } : null,
            ]}
            type="subtitle"
          >
            Usuario
          </ThemedText>
        </TouchableOpacity>

        {/* divisao */}
        <ThemedText style={{ width: 20, height: '100%' }}>|</ThemedText>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setTouglePage('empresa')}
        >
          <ThemedText
            style={[
              {
                flex: 1,
                textAlign: 'center',
              },
              touglePage === 'empresa' ? { color: 'green' } : null,
            ]}
            type="subtitle"
          >
            Empresa
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* usuario page - user */}
      {touglePage === 'user' && (
        <>
          <ThemedView>
            <ThemedText type="subtitle">Nome</ThemedText>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nome do usuário"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
              />
            </View>
          </ThemedView>

          <ThemedView>
            <ThemedText type="subtitle">Nova senha</ThemedText>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry={secureEntery}
              />

              <TouchableOpacity
                onPress={() => {
                  setSecureEntery((prev) => !prev);
                }}
                style={{ padding: 6 }}
              >
                <Ionicons name={'eye'} size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </ThemedView>

          {/* //* atualizar dados do usuario */}
          {(name != UserControl?.name || password != UserControl?.password) && (
            <TouchableOpacity
              onPress={handleUpdate}
              style={{
                padding: 2,
                margin: 10,
                width: 180,
                alignSelf: 'center',

                borderBottomWidth: 1,
                borderBottomColor: '#f00efd90',
              }}
            >
              <ThemedText
                style={{
                  textAlign: 'center',
                }}
                type="default"
              >
                Atualizar
              </ThemedText>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleClearImage}
            style={{
              padding: 2,
              margin: 10,
              width: 180,
              alignSelf: 'center',

              borderBottomWidth: 1,
              borderBottomColor: '#f00efd90',
            }}
          >
            <ThemedText
              style={{
                textAlign: 'center',
              }}
              type="default"
            >
              Excluir imagem do perfil
            </ThemedText>
          </TouchableOpacity>
        </>
      )}

      {/* empresa page */}
      {touglePage === 'empresa' && (
        <>
          <ThemedView>
            <ThemedText type="subtitle">Nome da Empresa</ThemedText>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nome da sua empresa"
                // value={}
                // onChangeText={(text) => (text)}
                style={styles.input}
              />
            </View>
          </ThemedView>
          <ThemedView>
            <ThemedText type="subtitle">Subtitulo</ThemedText>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Aqui pode ser uma frase de insperação"
                // value={}
                // onChangeText={(text) => (text)}
                style={styles.input}
                // secureTextEntry={secureEntery}
              />
            </View>
          </ThemedView>

          {/* collapsible redes sociais */}
          <Collapsible title="Redes sociais">
            <ThemedView>
              <View style={styles.inputRedes}>
                <TabBarIcon name="logo-instagram" size={18} />
                <TextInput
                  placeholder="Instagram"
                  // value={}
                  // onChangeText={(text) => (text)}
                  style={styles.input}
                  // secureTextEntry={secureEntery}
                />
              </View>
              <View style={styles.inputRedes}>
                <TabBarIcon name="logo-facebook" size={18} />
                <TextInput
                  placeholder="Facebook"
                  // value={}
                  // onChangeText={(text) => (text)}
                  style={styles.input}
                  // secureTextEntry={secureEntery}
                />
              </View>
              <View style={styles.inputRedes}>
                <TabBarIcon name="logo-linkedin" size={18} />
                <TextInput
                  placeholder="Linkedin"
                  // value={}
                  // onChangeText={(text) => (text)}
                  style={styles.input}
                  // secureTextEntry={secureEntery}
                />
              </View>
            </ThemedView>
          </Collapsible>
          <EmployeeList />
        </>
      )}

      {/* Onde o cuidado se transforma em uma\nexperiência única! */}
      <ThemedView style={styles.sairButtonWrapper}>
        <TouchableOpacity
          style={styles.sairButtonWrapperTouch}
          onPress={handleLogout}
        >
          <ThemedText style={styles.sairText} type="default">
            Sair
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    flex: 1,
    width: '100%',
    height: 410,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sairButtonWrapperTouch: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
  },
  sairButtonWrapper: {
    backgroundColor: '#00000020',

    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'gray',

    borderRadius: 100,
    marginTop: 20,
    height: 50,
    width: 200,
    margin: 'auto',
    justifyContent: 'center',
  },
  sairText: {
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 2,
  },

  inputRedes: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 2,
  },

  touchImage: {
    flex: 1,
    overflow: 'hidden',
  },
  buttonImg: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fedfed',

    right: 10,
    bottom: 24,
  },
  wrapperImage: {
    flex: 1,
    height: 410,
    overflow: 'hidden',
  },
});
