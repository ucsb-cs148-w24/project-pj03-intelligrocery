//ReactNative Libraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Entypo, MaterialIcons } from 'react-native-vector-icons'; // Import Entypo from react-native-vector-icons
import Pantry from './pages/pantry';
import Recipes from './pages/recipes';
import GroceryList from './pages/groceryList';
import Login from './pages/login';
import Settings from './pages/settings';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
              let Component;
              
              if (route.name === 'Settings') {
                Component = MaterialIcons
                iconName = 'settings';
              }
              else {
                Component = Entypo
                if (route.name === 'Grocery List') {
                  iconName = 'text-document';
                } else if (route.name === 'Pantry') {
                  iconName = 'archive';
                } else if (route.name === 'Recipes') {
                  iconName = 'bowl';
                }
            }
            
              return <Component name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Grocery List" component={GroceryList} />
          <Tab.Screen name="Pantry" component={Pantry} />
          <Tab.Screen name="Recipes" component={Recipes} />
          <Tab.Screen name='Settings' component={Settings} />
        </Tab.Navigator>
    </GestureHandlerRootView>
  );
}

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
  );
}