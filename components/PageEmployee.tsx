import * as React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { EMPLOYEES } from '@/constants/Employee';

export const PageEmployee = () => {
  const [checked, setChecked] = React.useState('');

  const handleRadioButtonChange = (newValue: string) => {
    setChecked(newValue);
  };

  return (
    <View>
      <RadioButton.Group
        onValueChange={handleRadioButtonChange}
        value={checked}
      >
        {EMPLOYEES.map((employee) => (
          <RadioButton.Item
            key={employee.id}
            label={employee.name}
            value={employee.name}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: checked === employee.name ? '#fbf978' : '#ddd',
              borderRadius: 10,
              marginVertical: 5,
              backgroundColor:
                checked === employee.name ? '#fbf978' : '#FFFFFF',
            }}
          />
        ))}
      </RadioButton.Group>
    </View>
  );
};
