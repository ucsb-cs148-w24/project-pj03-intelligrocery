// // GroceryList.js
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/styles';
import AddIngredient from './addIngredient';
import IngredientItem from './ingredientItem';

const GroceryList = ({ navigation }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [groceryList, setGroceryList] = useState([]);

    // Function to be triggered when the button is pressed
    const handleButtonPress = () => {
        setOverlayVisible(true);
    };

    const handleOverlayClose = () => {
        setOverlayVisible(false);
    };

    const handleOverlayAdd = (ingredient, quantity, units) => {
        setOverlayVisible(false);
        setGroceryList([{ingredient, quantity, units, id: Math.random().toFixed(16).slice(2)}, ...groceryList]);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={handleButtonPress} style = {styles.plusButton}>
                <Text style = {styles.buttonText}>+</Text>
            </TouchableOpacity>
        ),
        });
    }, [navigation]);

    const toggleCheck = (id) => {
        const newGroceryList = [...groceryList];
        const index = newGroceryList.findIndex((item) => item.id === id);
        newGroceryList[index].checked = !newGroceryList[index].checked;
        const checkedList = newGroceryList.filter((item) => item.checked);
        const uncheckedList = newGroceryList.filter((item) => !item.checked);
        setGroceryList([...uncheckedList, ...checkedList]);
    }

    const handleDelete = (id) => {
        const newGroceryList = [...groceryList];
        const index = newGroceryList.findIndex((item) => item.id === id);
        newGroceryList.splice(index, 1);
        setGroceryList(newGroceryList);
    }
    
    return groceryList.length === 0 ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleButtonPress}>
            <Text>Add items to your grocery list!</Text>
          </TouchableOpacity>
          <AddIngredient isVisible={isOverlayVisible} onClose={handleOverlayClose} onAdd={handleOverlayAdd} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <AddIngredient isVisible={isOverlayVisible} onClose={handleOverlayClose} onAdd={handleOverlayAdd} />
          {groceryList.map((item, index) => (
            <IngredientItem 
              key={item.id} 
              toggleCheck={toggleCheck}
              handleDelete={handleDelete}
              item={item}
            />
          ))}
        </ScrollView>
      );
    };

    export default GroceryList;