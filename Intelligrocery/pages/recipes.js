// recipes.js
import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from '../styles/styles';
import RecipeCard from './recipeCard';
import { ScrollView } from 'react-native-gesture-handler';
import {performApiCall} from '../scripts/apiCall'

export default function Recipes(groceryList, setGroceryList) {

  const [recipeQuery, setRecipeQuery] = useState('')

  const [recipes, setRecipes] = useState([])

  const handleAddToGrocery = async ({ingredient, quantity, units}) => {
  //   console.log("In handleAddToGrocery\n");
  //   quantity = parseFloat(quantity)   
  //   // Check if the item exists in the pantry
  //   let id = groceryList.findIndex((item) => item.ingredient === ingredient && item.units === units);
  //   if (id !== -1) {
  //     console.log("Item found\n");
  //     // Units are compatible, update quantity
  //     const groceryItem = groceryList[id];
  //     const updatedQuantity = groceryItem.quantity + quantity;
  //     // Update item in grocery list
  //     setGroceryList((prevGroceryList) => {
  //       const updatedGroceryList = prevGroceryList.map((item, index) => {
  //           if (index === id) {
  //               return { ...item, quantity: updatedQuantity };
  //           }
  //           return item;
  //       });
  //       return updatedGroceryList;
  //     });
  //     //We don't want to add variable list id in the database
  //     const { id, ...updatedGroceryItem } = groceryItem;
  //     await updateDocFB(collectionName = "pantry", documentID = updatedGroceryItem.dbID, data = updatedGroceryItem);
  //   } else {
  //     console.log("Item not found\n");
  //     id = groceryList.length > 0 ? Math.max(...groceryList.map(item => item.id)) + 1 : 0;
  //     setGroceryList((prevGroceryList) => [...prevGroceryList, {ingredient, quantity, units, id}]);
  //     console.log("Next id in groceryList: ", id);
  //       const dbID = await addDocFB(
  //         docData = {
  //             ingredient,
  //             quantity,
  //             units,
  //             checked : false,
  //           },
  //         collectionName = "groceryList");
  //         console.log("Added to grocery list: ", ingredient);
  //         setGroceryList(prevList => { //calling setGroceryList seems to let the past set finish first
  //           const updatedList = prevList.map(item => {
  //               if (item.id === id) {
  //                   return { ...item, dbID };
  //               }
  //               return item;
  //           });
  //         console.log("Made this item have dbID: ", dbID)
  //         return updatedList;
  //   });
  // }
  }

  const searchRecipe = async () => {
    if (recipeQuery){
      const result = await performApiCall(recipeQuery)
      setRecipes(result)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.recipePageContainer}
        >
        <TextInput
            style={styles.search}
            placeholder='Search for recipes...'
            onChangeText={newRecipeQuery => setRecipeQuery(newRecipeQuery)}
            onSubmitEditing={searchRecipe}
          />
          <ScrollView contentContainerStyle={styles.recipeCardList } showsVerticalScrollIndicator={false}>
            {(recipes && recipes.length === 0) ? (
              <View style={styles.emptyScreen}>
                <Text>Look up recipes!</Text>
              </View>
            ) : (
              recipes && recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  title={recipe.name}
                  recipeLink={recipe.url}
                  imageSource={recipe.images.SMALL.url}
                  ingredients={recipe.ingredients}
                  largeImage={recipe.images.REGULAR.url}
                />
              ))
            )}
          </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );

}