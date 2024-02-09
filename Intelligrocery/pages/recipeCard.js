import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from '../styles/styles';
import { Spacer } from 'react-native-flex-layout';

const RecipeCard = ({ imageSource, title, numIngredients, recipeLink }) => {
    const handlePress = () => {
        Linking.openURL(recipeLink);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style = {styles.recipeCard}>
                <Image style = {styles.recipeCardImage} source={{uri: imageSource}} />
                <View style = {styles.recipeDetails}>
                    <Text style = {styles.recipeCardTitle}>{title}</Text>
                    <Text style = {styles.recipeCardNumIngredients}>{numIngredients} ingredients</Text>
                </View>
                <Spacer />
            </View>
        </TouchableOpacity>
    );
};

export default RecipeCard;
