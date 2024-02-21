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
        const id = groceryList.length > 0 ? Math.max(...groceryList.map(item => item.id)) + 1 : 0;
        setGroceryList([{ingredient, quantity, units, id}, ...groceryList]);
        console.log("Next id in groceryList: ", id);
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
      console.log("Id to try and delete from grocery list: ", id)
      const index = groceryList.findIndex((item) => item.id === id);
      if (index != -1) {
        const newGroceryList = [...groceryList];
        const item = newGroceryList[index]
        newGroceryList.splice(index, 1);
        setGroceryList(newGroceryList);
      }
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