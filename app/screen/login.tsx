import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Alert,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { storage } from '../util/storage.js';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntery, setSecureEntery] = useState(true);
  const router = useRouter();

  const [user, setUser] = useState<string | null>(null);

  const checkUser = async () => {
    try {
      const user = await storage.load({ key: 'image' });
      setUser(user);
    } catch (e) {
      console.log('No user data found in login screen');
    }
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  const handleLogin = async () => {
    const fakeName = 'Anderson';
    const fakePassword = '123';

    const IUser = {
      name: name,
      password: password,
    };

    if (name === fakeName && password === fakePassword) {
      storage.save({
        key: 'user',
        data: IUser,
        expires: null,
      });
      router.replace('/');

      console.log('Usuário logado com sucesso!');
      Alert.alert('Tudo ok!', `Bem-vindo, ${name}!`);
    } else {
      // console.error('Erro ao fazer login: Credenciais inválidas');
      Alert.alert(
        `${name.length ? name : 'Login'}`,
        'Nome ou senha inválidos.'
      );
    }
  };

  // const handleGoBack = () => {
  //   navigation.goBack();
  // };
  // const handleSignup = () => {
  //   navigation.navigate('SIGNUP');
  // };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        user ? (
          <Image source={{ uri: user }} style={styles.reactLogo} />
        ) : (
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.reactLogo}
          />
        )
      }
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          padding: 10,
        }}
      >
        <ThemedText style={styles.title} type="title">
          Beauty Salon
        </ThemedText>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="people-outline" size={24} color="#A1CEf0" />
        <TextInput
          placeholder="Usuário"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#A1CEf0" />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={secureEntery}

          // keyboardType="numeric"
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

      <TouchableOpacity>
        <ThemedText style={styles.forgotPasswordText} type="default">
          Esqueceu a senha?
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        //  style={styles.loginButtonWrapper}
        onPress={handleLogin}
      >
        <ThemedView style={styles.loginButtonWrapper}>
          <ThemedText style={styles.loginText} type="default">
            Login
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      <ThemedText style={styles.continueText}>ou continue com</ThemedText>

      {/* <TouchableOpacity style={styles.googleButtonContainer}> */}
      <ThemedView style={styles.googleButtonContainer}>
        <Image
          source={require('@/assets/images/google.png')}
          style={styles.googleImage}
        />
        <ThemedText style={styles.googleText}>Google</ThemedText>
      </ThemedView>
      {/* </TouchableOpacity> */}

      <View style={styles.footerContainer}>
        <ThemedText>Você não tem conta?</ThemedText>
        <TouchableOpacity
        //  onPress={handleSignup}
        >
          <ThemedText style={styles.signupText}>Click aqui!</ThemedText>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/images/vector1.png')}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120%',
          height: '40%',
          zIndex: -1,
          opacity: 0.5,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -30,
          right: 0,
          transform: [{ rotate: '-90deg' }],
          width: 80,
          height: 130,
          zIndex: -1,
          flex: 1,
          opacity: 0.5,
        }}
      >
        <Image
          source={require('../../assets/images/vector2.png')}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
        />
      </View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   padding: 20,
  //   backgroundColor: '#f5f5f5',
  // },
  reactLogo: {
    flex: 1,
    height: 410,
    width: '100%',
  },
  title: {
    flex: 1,
    // height: 100,
    fontSize: 40,
    backgroundColor: 'transparent',
    padding: 10,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 2,
  },

  forgotPasswordText: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  loginButtonWrapper: {
    borderWidth: 1,
    borderColor: '#00000090',
    borderRadius: 100,
    marginTop: 20,
    padding: 8,
    height: 50,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 20,
    textAlign: 'center',
    // padding: 10,
  },
  continueText: {
    textAlign: 'center',
    fontSize: 14,
  },

  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#00000090',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    height: 50,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    gap: 5,
  },
  signupText: {
    color: 'blue',
  },
});
