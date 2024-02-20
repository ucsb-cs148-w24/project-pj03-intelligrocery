//ReactNative Libraries
import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
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

import { auth } from './firebase'; // Assuming your firebase initialization file is named firebase.js and is in the same directory

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
  const [initialRoute, setInitialRoute] = useState('Tabs');
  const [isLoading, setIsLoading] = useState(true);
  const isEffectMounted = useRef(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        if (!auth) {
          console.log('Firebase auth is not yet initialized. Waiting...');
          setTimeout(checkUserLoggedIn, 1000); // Retry after 1 second
          return;
        }

        const unsubscribe = auth.onAuthStateChanged(user => {
          if (isEffectMounted.current) {
            // Only update state if the component is still mounted
            if (user) {
              setInitialRoute('Login');
            } else {
              setInitialRoute('Tabs');
            }
            setIsLoading(false);
            unsubscribe(); // Unsubscribe from auth state changes
          }
        });
      } catch (error) {
        console.error('Error checking user authentication:', error);
        setIsLoading(false);
      }
    };

    // Execute the effect only once after the initial render
    if (!isEffectMounted.current) {
      checkUserLoggedIn();
      isEffectMounted.current = true; // Set to true after the first execution
    }

    // Cleanup function to unsubscribe from auth state changes when the component unmounts
    return () => {
      isEffectMounted.current = false; // Set to false when the component unmounts, (so that the next time you log on you haven't yet mounted)
    };
  }, []); // Empty dependency array to run the effect only once after the initial render

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

// const LoginStack = () => {
//   const [initialRoute, setInitialRoute] = useState('Tabs');
//   const [isLoading, setIsLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     const initializeFirebase = async () => {
//       try {
//         if (!auth) {
//           throw new Error('Firebase auth is not initialized.');
//         }

//         // Continue with authentication logic
//         // For example, wait for user authentication state changes
//         await new Promise((resolve, reject) => {
//           const unsubscribe = auth.onAuthStateChanged(user => {
//             // Handle authentication state changes here
//             resolve();
//             unsubscribe();
//           }, reject);
//         });

//         setIsLoading(false); // Update isLoading when auth state is determined
//       } catch (error) {
//         console.log('Error initializing Firebase:', error);
//         // Retry initialization after a short delay
//         setTimeout(initializeFirebase, 1000); // Retry after 1 second
//       }
//     };

//     // Start Firebase initialization
//     initializeFirebase();
//   }, []); // Only run the effect once after the initial render

//   if (isLoading) {
//     // Render loading indicator or placeholder while waiting for authentication status
//     return <LoadingIndicator />;
//   }

//   return (
//     <Stack.Navigator initialRouteName={initialRoute}>
//       <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
//       <Stack.Screen name="Tabs" component={TabNavigator} />
//     </Stack.Navigator>
//   );
// }






export default function App() {
  return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
  );
}