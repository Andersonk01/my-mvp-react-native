import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { EMPLOYEES } from '@/constants/employee';
import { Collapsible } from './Collapsible';
import { ThemedText } from './ThemedText';

export const EmployeeList: React.FC = () => {
  return (
    <Collapsible title="Funcionários">
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <ThemedText type="defaultSemiBold">Nome</ThemedText>
          </DataTable.Title>
          <DataTable.Title>
            <ThemedText type="defaultSemiBold">Trabalho</ThemedText>
          </DataTable.Title>
          <DataTable.Title>
            <ThemedText type="defaultSemiBold">Disponibilidade</ThemedText>
          </DataTable.Title>
        </DataTable.Header>
        {EMPLOYEES.map((employee) => (
          <DataTable.Row key={employee.id}>
            <DataTable.Cell>
              <ThemedText style={styles.defaultText}>
                {employee.name}
              </ThemedText>
            </DataTable.Cell>

            <DataTable.Cell
              style={{
                justifyContent: 'center',
              }}
            >
              <ThemedText style={styles.defaultText}>
                {employee.role}
              </ThemedText>
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                justifyContent: 'center',
              }}
            >
              {employee.availability.map((timeSlot, index) => (
                <ThemedText
                  style={{
                    fontSize: 12,
                  }}
                  key={index}
                >
                  {timeSlot}
                </ThemedText>
              ))}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </Collapsible>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 14,
  },
});
