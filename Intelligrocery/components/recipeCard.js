import { View, Text, Image, ScrollView } from 'react-native';
import * as React from 'react';

function RecipeCard (name, url, image) {
    return (
        <View>
            <Text>Name</Text>
            <Text>url</Text>
            <Image></Image>
        </View> 
    );
};

export default RecipeCard;