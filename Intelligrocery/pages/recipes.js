// recipes.js
import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from '../styles/styles';
import RecipeCard from './recipeCard';
import { ScrollView } from 'react-native-gesture-handler';
import {performApiCall} from '../scripts/apiCall'

export default function Recipes() {

  const [recipeQuery, setRecipeQuery] = useState('')

  const [recipes, setRecipes] = useState([])

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