import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import { ThemedView } from './ThemedView';
import { WrapperAgendamento } from './WrapperAgendamento';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import ParallaxScrollView from './ParallaxScrollView';
import { TabBarIcon } from './navigation/TabBarIcon';
import { CompanyEntityProps } from '@/app/@type/companyEntityProps';

type TModalProps = CompanyEntityProps & {
  children: React.ReactNode;
};

export const MyModal: React.FC<TModalProps> = ({
  children,
  type: typeButton = 'default',
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        onDismiss={hideModal}
        visible={visible}
        // supportedOrientations={['portrait', 'landscape']}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#ffffff50', dark: '#00000050' }}
          headerImage={
            <Image
              source={require('../assets/images/logo.png')}
              // style={styles.reactLogo}
              style={{ flex: 1, width: '100%', height: 410 }}
            />
          }
        >
          <ThemedView style={styles.contend}>
            <ThemedText
              type="subtitle"
              style={{
                textAlign: 'center',
                fontStyle: 'italic',
                letterSpacing: 2,
                marginBottom: 0,
              }}
            >
              Beauty Salon
            </ThemedText>

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={hideModal}
            >
            <Text>Cancelar</Text>
          </Pressable> */}
          </ThemedView>
          {children}
        </ParallaxScrollView>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={showModal}
      >
        {typeButton === 'Serviços' && <WrapperAgendamento type="Serviços" />}

        {typeButton === 'Funcionário' && (
          <WrapperAgendamento type="Funcionário" />
        )}

        {typeButton === 'Horário' && <WrapperAgendamento type="Horário" />}

        {typeButton === 'default' && (
          <ThemedText style={styles.textStyleOpen}>Abrir</ThemedText>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  contend: {
    position: 'absolute',
    top: -10,
    left: -10,
    // zIndex: 999,
    justifyContent: 'flex-end',

    borderColor: '#00000050',
    borderWidth: 1,

    paddingHorizontal: 2,

    height: 40,
    width: '100%',
    backgroundColor: '#00000030',
    // justifyContent: 'center',

    borderBottomRightRadius: 50,

    shadowColor: '#DAA5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'flex-end',
  },
  button: {},
  buttonOpen: {
    backgroundColor: 'transparent',
  },
  buttonClose: {
    backgroundColor: '#DAA520',
  },
  textStyleOpen: {
    borderRadius: 8,
    backgroundColor: '#DAA5aa95',
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
});
