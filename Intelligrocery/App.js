import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryScreen from "./components/PantryScreen";
import GroceryListScreen from "./components/GroceryListScreen";
import RecipeScreen from "./components/RecipeScreen";
// import { withAuthenticator } from '@aws-amplify/ui-react';
// import { Amplify } from 'aws-amplify';
// import config from './src/amplifyconfiguration.json';
// import '@aws-amplify/ui-react/styles.css';

// Amplify.configure(config);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="GroceryList" component={GroceryListScreen} />
        <Tab.Screen name="Pantry" component={PantryScreen} />
        <Tab.Screen name="Recipes" component={RecipeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}