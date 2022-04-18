import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

// Componentes
import { Map } from './app/views/Map';
import { Lista } from './app/views/Lista';
import { Detalles } from './app/views/Detalles';

let scheme = Appearance.getColorScheme();


const MapStack = createStackNavigator();

function MapStackScreen() {
  return (
    <MapStack.Navigator initialRouteName='Map' screenOptions={{
      headerBackTitleVisible: false
    }}>
      <MapStack.Screen name="Map" component={Map} />
      <MapStack.Screen name="Detalles" component={Detalles} />
    </MapStack.Navigator>
  );
}

const ListStack = createStackNavigator();
function ListStackScreen() {
  return (
    <ListStack.Navigator initialRouteName='Lista'>
      <ListStack.Screen name="Lista" component={Lista} />
    </ListStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

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
          headerShown: false
        })}
      >
        <Tab.Screen name="Mapa" component={MapStackScreen} />
        <Tab.Screen name="Lista" component={ListStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

