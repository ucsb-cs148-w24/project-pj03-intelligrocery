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
    quantity = parseFloat(quantity)
    id = groceryList.length > 0 ? Math.max(...groceryList.map(item => item.id)) + 1 : 0;
    setGroceryList((prevGroceryList) => [...prevGroceryList, {ingredient, quantity, units, id}]);

    console.log("Next id in groceryList: ", id);
      const dbID = await addDocFB(
        docData = {
            ingredient,
            quantity,
            units,
            checked : false,
            // appListKey: id,
          },
        collectionName = "groceryList");
        console.log("Added to grocery list: ", ingredient);
        setGroceryList(prevList => { //calling setGroceryList seems to let the past set finish first
          const updatedList = prevList.map(item => {
              if (item.id === id) {
                  return { ...item, dbID };
              }
              return item;
          });
        console.log("Made this item have dbID: ", dbID)
        return updatedList;
    });
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
                  handleAdd={handleAddToGrocery}
                />
              ))
            )}
          </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );

}