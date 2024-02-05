import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeCard from './recipeCard';
import sampleData from '../mockdata/sample_data1.json'

export default class RecipeScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  handleEnter = () => {
    console.log('Searching...', this.state.search);
    const recipes = this.extractRecipeData(sampleData);
    console.log(recipes)
  }

  extractRecipeData = (sampleData) => {
    // Initialize an array to hold the extracted data
    const extractedData = [];
  
    // Check if the input JSON object has a 'Recipes' key and iterate through it if present
    if (sampleData && Array.isArray(sampleData.Recipes)) {
        sampleData.Recipes.forEach(recipe => {
        // Extract the required information: name, url, and small image URL
        const { name, url, images } = recipe;
        const smallImageUrl = images.SMALL.url; // Accessing the SMALL image URL
  
        // Add the extracted data to the array
        extractedData.push({
          name,
          url,
          smallImageUrl
        });
      });
    }
  
    // Return the array containing the extracted data
    return extractedData;
  };

  render() {
    const { search } = this.state;
    return (
      <View>
        <SearchBar
        placeholder="Search a recipe..."
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={{ backgroundColor: 'lightgrey' }}
        inputContainerStyle={{ backgroundColor: "#EEEEEE" }}
        />
        <Button
        title ='Enter'
        onPress={this.handleEnter}
        ></Button>
        <RecipeCard></RecipeCard>
        </View>
    );
  }
}