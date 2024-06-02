import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CompanyEntityProps } from '@/app/@type/companyEntityProps';

export function WrapperAgendamento({ type = 'Serviços' }: CompanyEntityProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textBox}>
        <Text style={styles.text}>{type}</Text>
      </View>

      <View style={styles.icon}>
        <Ionicons type="arrow-redo" size={20} color={'gray'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#00000080',
    borderRadius: 8,

    backgroundColor: 'white',

    flexDirection: 'row',
    padding: 4,
  },
  textBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 4,
    height: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
