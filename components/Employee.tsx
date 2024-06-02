import React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { EMPLOYEES } from '@/constants/employee';
import { Collapsible } from './Collapsible';
// import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface Employee {
  id: number;
  name: string;
  role: string;
  availability: string[];
}

export const EmployeeList: React.FC = () => {
  return (
    <Collapsible title="Funcionários">
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nome</DataTable.Title>
          <DataTable.Title>Trabalho</DataTable.Title>
          <DataTable.Title>Disponibilidade</DataTable.Title>
        </DataTable.Header>
        {EMPLOYEES.map((employee) => (
          <DataTable.Row key={employee.id}>
            <DataTable.Cell>{employee.name}</DataTable.Cell>
            <DataTable.Cell>{employee.role}</DataTable.Cell>
            <DataTable.Cell>
              {employee.availability.map((timeSlot, index) => (
                <ThemedText key={index}>{timeSlot}</ThemedText>
              ))}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </Collapsible>
  );
};
