import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from '../screen/login';
import { storage } from '../util/storage';

import { User } from '../@type/User';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user: User = await storage.load({ key: 'user' });
        setUser(user);
        console.log(user);
      } catch (e) {
        console.log('No user data found');
      }
    };

    checkUser();
  }, []);

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Agendar',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'calendar' : 'calendar-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'people-circle' : 'people-circle-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="myAgenda"
        options={{
          title: 'Agendamentos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'calendar-clear' : 'calendar-clear-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'settings-sharp' : 'settings-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
