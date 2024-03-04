import {React, useState} from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import RecipeItem from './recipeItem';


const RecipePage = ({ route }) => {
    const { imageSource, title, ingredients, recipeLink } = route.params;
    const navigation = useNavigation();

    const handlePress = () => {
        Linking.openURL(recipeLink);
    };

    return (
        <ScrollView contentContainerStyle={styles.recipePage} style={{backgroundColor: 'white'}}>
            <Image style={styles.recipePageImage} source={{ uri: imageSource }} resizeMode='stretch' />
            <View style={styles.titleAndIngredients}>
                <Text style={styles.recipePageTitle}>{title}</Text>
                <Text style={styles.recipePageNumIngredients}>{ingredients.length} ingredients:</Text>
                {ingredients.map((ingredient, index) => (
                    <RecipeItem
                        key={index}
                        ingredient={ingredient.food} 
                        quantity={ingredient.quantity} 
                        units={ingredient.measure} 
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.goToRecipe} onPress={handlePress}>
                <Text style={styles.buttonText}>Go to Recipe</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RecipePage;