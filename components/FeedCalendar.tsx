import React, { useEffect, useState } from 'react';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { storage } from '@/app/util/storage';
import * as Calendar from 'expo-calendar';

export const FeedCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [myCalendars, setMyCalendars] = useState<Calendar.Calendar[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        // console.log('calendários:', calendars);
        setMyCalendars(calendars);
      }
    })();
  }, []);

  function convert(date: string) {
    const [year, month, day] = date.split('/');
    setSelectedDate(`${year}-${month}-${day}`);
  }

  // adicionando evento ao calendário
  const addEventToCalendar = async () => {
    if (!selectedDate) {
      Alert.alert(
        'Nenhuma data selecionada',
        'Por favor, selecione uma data primeiro.'
      );
      return;
    }

    const defaultCalendar = myCalendars.find(
      (calendar) =>
        calendar.source.name === 'Default' || calendar.source.isLocalAccount
    );

    if (defaultCalendar) {
      const [hours, minutes] = time.split(':');
      const startDate = new Date(`${selectedDate}T${hours}:${minutes}:00`);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

      try {
        await Calendar.createEventAsync(defaultCalendar.id, {
          title: 'Beauty Salon',
          startDate,
          endDate,
          timeZone: 'America/Fortaleza',
          location: 'Rua Tal, 4002-8922, CentroYude, Caxias - MA',
        });
        Alert.alert('Agendamento adicionado ao calendário', '😉😁');
      } catch (error: any) {
        Alert.alert('Erro ao adicionar evento', error.message);
      }
    }
  };

  const handleSaveDate = async () => {
    if (!selectedDate) {
      Alert.alert(
        'Nenhuma data selecionada',
        'Por favor, selecione uma data primeiro.'
      );
      return;
    }

    await storage.save({ key: 'selectedDate', data: selectedDate });
    console.log('selectedDate:', selectedDate);

    Alert.alert(
      `Salvo com sucesso! - ${selectedDate
        .split('-')
        .reverse()
        .join('/')} às ${time}`,
      'Deseja adicionar ao seu calendário?',
      [
        {
          text: 'Não obrigado',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: addEventToCalendar,
        },
      ]
    );
  };

  return (
    <ThemedView>
      <ThemedView style={style.wrapperTitle}>
        <ThemedText type="title">Escolha o dia certo para você!</ThemedText>
      </ThemedView>

      <DatePicker
        locale="PT-BR"
        mode="calendar"
        current={getToday().toString()}
        selected={getToday().toString()}
        selectorStartingYear={2024}
        minimumDate={'2024-06-03'}
        maximumDate="2024-12-31"
        onSelectedChange={(date) => convert(date)}
      />

      <ThemedView style={style.wrapperTitleHora}>
        <ThemedText type="title">Qual horário ?</ThemedText>
      </ThemedView>
      <Divider horizontalInset />

      <DatePicker
        mode="time"
        locale="PT-BR"
        minuteInterval={3}
        onTimeChange={(selectedTime) => setTime(selectedTime)}
        options={{
          textDefaultColor: '#faa',
          textHeaderFontSize: 34,
          backgroundColor: 'transparent',
        }}
      />

      {selectedDate && time && (
        <>
          <ThemedView style={style.selectedDate}>
            <ThemedText style={style.selectedDateText} type="subtitle">
              {selectedDate.split('-').reverse().join('/')}
            </ThemedText>

            <ThemedText style={style.selectedDateText} type="subtitle">
              {time} hrs
            </ThemedText>
          </ThemedView>
          <Divider horizontalInset bold />
          <TouchableOpacity style={style.save} onPress={handleSaveDate}>
            <ThemedText style={style.saveText}>Salvar</ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
};

const style = StyleSheet.create({
  wrapperTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  wrapperTitleHora: {
    width: '100%',
    marginTop: 28,
    alignItems: 'center',
  },
  selectedDate: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  selectedDateText: {
    fontSize: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
  },
  save: {
    backgroundColor: '#00000030',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'gray',
    borderRadius: 100,
    marginTop: 20,
    height: 50,
    width: 200,
    margin: 'auto',
    justifyContent: 'center',
    shadowColor: '#DAA5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  saveText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
