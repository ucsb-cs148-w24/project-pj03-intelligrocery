import {app_id, app_key} from 'react-native-dotenv'
import axios from 'axios';

export async function performApiCall(foodName) {
    const url = `https://api.edamam.com/api/recipes/v2?app_id=${app_id}&app_key=${app_key}&q=${foodName}&type=any`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        const recipes = parseRecipeData(data)
        return recipes
    } catch (error) {
        console.error('Error making API call:', error.message);
    }
}

function parseRecipeData(jsonData) {
    const parsedData = [];

    if (jsonData.hits && Array.isArray(jsonData.hits)) {
        jsonData.hits.forEach(hit => {
            if (hit.recipe && typeof hit.recipe === 'object') {
                const recipeInfo = hit.recipe;
                const parsedRecipe = {
                    name: recipeInfo.label || '',
                    url: recipeInfo.url || '',
                    images: recipeInfo.images || '',
                    ingredients: recipeInfo.ingredients || []
                };
                parsedData.push(parsedRecipe);
            }
        });
    }

    return parsedData;
}