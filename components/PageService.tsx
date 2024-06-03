// import * as React from 'react';
import { useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { BEAUTY_SERVICES } from '@/constants/Service';
import type { BeautyService } from '@/app/@type/BeautyService';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Collapsible } from './Collapsible';

export const PageService = () => {
  const [checked, setChecked] = useState('');

  const [services, setServices] = useState<BeautyService[]>([]);

  // add a new service to the list
  const handleRadioButtonChange = (newValue: string) => {
    setChecked(newValue);

    const selectedService = BEAUTY_SERVICES.find(
      (service) => service.name === newValue
    );

    if (selectedService) {
      if (services.find((data) => data.name === newValue)) {
        setServices((prev) => prev.filter((data) => data.name !== newValue));
      } else {
        setServices((prev) => [...prev, selectedService]);
      }
    } else {
      Alert.alert('Serviço esgotado!');
    }
  };
  console.log('---------------------:', services);

  return (
    <View>
      {BEAUTY_SERVICES.map((service) => (
        <View
          key={service.id}
          style={{
            padding: 10,
            marginVertical: 5,
            borderBottomWidth: 1,
            borderRadius: 10,

            borderBottomColor: services.find(
              (data) => data.name === service.name
            )
              ? 'darkgreen'
              : '#DDD',
          }}
        >
          <Collapsible title={service.name} typeTitle="subtitle">
            <ThemedText>Preço: R$ {service.price}</ThemedText>
            <ThemedText>Duração: {service.duration} minutos</ThemedText>
          </Collapsible>
          <View
            style={{
              backgroundColor: 'transparent',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <RadioButton
              value={service.name}
              onPress={() => handleRadioButtonChange(service.name)}
              status={
                services.find((data) => data.name === service.name)
                  ? 'checked'
                  : 'unchecked'
              }
            />
          </View>
        </View>
      ))}
    </View>
  );
};
