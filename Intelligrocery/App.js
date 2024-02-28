//ReactNative Libraries
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Entypo, MaterialIcons } from 'react-native-vector-icons'; // Import Entypo from react-native-vector-icons
import Pantry from './pages/pantry';
import PantryItem from './pages/pantryItem';
import Recipes from './pages/recipes';
import GroceryList from './pages/groceryList';
import Login from './pages/login';
import RecipePage from './pages/recipePage';
import Settings from './pages/settings';

import { auth } from './firebase'; // Assuming your firebase initialization file is named firebase.js and is in the same directory

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();

const RecipeStack = () => {
   
  return (
    <Stack2.Navigator >
       <Stack2.Screen name="RecipesList" component={Recipes} options={{ title: 'Recipes' }}/>
       <Stack2.Screen name="RecipePage" component={RecipePage} options={{ title: 'Recipe Page' }} />
    </Stack2.Navigator>
  )
}

const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function TabNavigator() {
  const [groceryList, setGroceryList] = useState([]); 
  const [pantry, setPantry] = useState([]);

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
          <Tab.Screen name="Grocery List">
            {() => <GroceryList groceryList={groceryList} setGroceryList={setGroceryList} setPantry={setPantry} pantry = {pantry} />}
          </Tab.Screen>
          <Tab.Screen name="Pantry">
            {() => <GroceryList groceryList={groceryList} setGroceryList={setGroceryList} Pantry pantry={pantry} setPantry={setPantry} />}
          </Tab.Screen>
          <Tab.Screen name="Recipes" component={RecipeStack} options={{ headerShown: false }}/>
          <Tab.Screen name='Settings' component={Settings} />
        </Tab.Navigator>
    </GestureHandlerRootView>
  );
}

const LoginStack = () => {
  const [initialRoute, setInitialRoute] = useState('Tabs');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        if (!auth) {
          console.log('Firebase auth is not yet initialized. Waiting...');
          setTimeout(checkUserLoggedIn, 1000); // Retry after 1 second
          return;
        }

        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            setInitialRoute('Tabs'); // User is logged in, set initial route to 'Tabs'
          } else {
            setInitialRoute('Login'); // User is not logged in, set initial route to 'Login'
          }
          setIsLoading(false);
          unsubscribe(); // Unsubscribe from auth state changes
        });

      } catch (error) {
        console.error('Error checking user authentication:', error);
        setIsLoading(false);
      }
    };

    // Check if auth is already initialized
    if (auth) {
      checkUserLoggedIn();
    } else {
      console.log('Firebase auth is not yet initialized. Waiting...');
      setTimeout(checkUserLoggedIn, 1000); // Retry after 1 second
    }
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Tabs" component={TabNavigator} />
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