import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

// Componentes
import { Map } from './app/views/Map';
import { Lista } from './app/views/Lista';


const Tab = createBottomTabNavigator();
let scheme = Appearance.getColorScheme();

export default function App() {
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Mapa') {
              iconName = focused
                ? 'ios-map'
                : 'ios-map-outline';
            } else if (route.name === 'Lista') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF1801',
          tabBarInactiveTintColor: '#90a4ae',
        })}
      >
        <Tab.Screen name="Mapa" component={Map} />
        <Tab.Screen name="Lista" component={Lista} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

