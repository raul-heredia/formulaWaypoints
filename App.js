import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

// Componentes
import { Map } from './app/views/Map';
import { Lista } from './app/views/Lista';
import { Detalles } from './app/views/Detalles';
import { Camara } from './app/views/subcomponents/camara/Camara';

let scheme = "light"/* Appearance.getColorScheme() */;


const MapStack = createStackNavigator();

function MapStackScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Camara") {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'unset' } });
    }
  }, [navigation, route]);
  return (
    <MapStack.Navigator initialRouteName='Mapa de Circuitos' screenOptions={{
      headerBackTitleVisible: false,
    }}>
      <MapStack.Screen name="Mapa de Circuitos" component={Map} options={{ title: 'Mapa' }} />
      <MapStack.Screen name="Detalles" component={Detalles} />
      <MapStack.Screen name="Camara" component={Camara} />
    </MapStack.Navigator>
  );
}

const ListStack = createStackNavigator();
function ListStackScreen() {
  return (
    <ListStack.Navigator initialRouteName='List' screenOptions={{
      headerBackTitleVisible: false,
    }}>
      <ListStack.Screen name="List" component={Lista} options={{ title: 'Calendario F1 2022' }} />
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

