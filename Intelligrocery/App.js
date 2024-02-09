import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Entypo } from 'react-native-vector-icons'; // Import Entypo from react-native-vector-icons
import Pantry from './pages/pantry';
import Recipes from './pages/recipes';
import GroceryList from './pages/groceryList';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: [
              {
                display: 'flex'
              },
              null
            ],
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Grocery List') {
                iconName = 'text-document';
              } else if (route.name === 'Pantry') {
                iconName = 'archive';
              } else if (route.name === 'Recipes') {
                iconName = 'bowl';
              }

              return <Entypo name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Grocery List" component={GroceryList} />
          <Tab.Screen name="Pantry" component={Pantry} />
          <Tab.Screen name="Recipes" component={Recipes} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
