import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from '../screen/login';
import { storage } from '../util/storage';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await storage.load({ key: 'user' });
        console.log('User data:', user);
        setUser(user);
        console.log(user.name);
      } catch (e) {
        console.log('No user data found');
      }
    };

    checkUser();
  }, []);

  if (user) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarVisibilityAnimationConfig: {
            show: {
              animation: 'spring',
              config: {
                damping: 400,
                stiffness: 100,
                mass: 1,
                delay: 0,
                // duration: 300,
              },
            },
            hide: {
              animation: 'spring',
              config: {
                // duration: 300,
                damping: 400,
                stiffness: 100,
                mass: 1,
                delay: 10,
              },
            },
          },
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
  } else {
    return <LoginScreen />;
  }
}
