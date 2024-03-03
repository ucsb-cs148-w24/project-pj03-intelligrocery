import { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { useGroceryList } from '../context/groceryListContext';
import { addDocFB } from '../firebase';

export default function RecipeItem({ ingredient, quantity, units }) {
  if (units == '<unit>') {
      units = 'count';
  }

  const { groceryList, setGroceryList } = useGroceryList();

  const handleAdd = async () => {
    quantity = parseFloat(quantity);
    // const id = Math.random().toFixed(16).slice(2)
    const id = groceryList.length > 0 ? Math.max(...groceryList.map(item => item.id)) + 1 : 0;
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
  };

  return (
    <View style={styles.recipeItem}>
        <Text style={styles.ingredientText}>{quantity} {units} {ingredient}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Icon name="plus" size={10} color="white" />
        </TouchableOpacity>
    </View>
  );
}
