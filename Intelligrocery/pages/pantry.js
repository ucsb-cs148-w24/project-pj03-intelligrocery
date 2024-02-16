// // GroceryList.js
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/styles';
import AddIngredient from './addIngredient';
import PantryItem from './pantryItem';

import { addDocFB } from '../firebase'

const Pantry = ({ navigation }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [pantry, setPantry] = useState([]);

    // Function to be triggered when the button is pressed
    const handleButtonPress = () => {
        setOverlayVisible(true);
    };

    const handleOverlayClose = () => {
        setOverlayVisible(false);
    };

    const handleOverlayAdd = (ingredient, quantity, units) => {
        setOverlayVisible(false);
        setPantry([{ingredient, quantity, units, id: Math.random().toFixed(16).slice(2)}, ...pantry]);
        try {
          addDocFB(
            data = {
              groceryName : ingredient,
              quantity : quantity,
              unit : units,
              isChecked : false,
            }, 
           collectionName = "pantry");
          console.log("Added ", ingredient);
        } catch(error) {
          console.log(error.message);
        } 
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

    const handleDelete = (id) => {
        const newPantry = [...pantry];
        const index = newPantry.findIndex((item) => item.id === id);
        newPantry.splice(index, 1);
        setPantry(newPantry);
    }
    
    return pantry.length === 0 ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleButtonPress}>
            <Text>Add items to your pantry!</Text>
          </TouchableOpacity>
          <AddIngredient isVisible={isOverlayVisible} onClose={handleOverlayClose} onAdd={handleOverlayAdd} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <AddIngredient isVisible={isOverlayVisible} onClose={handleOverlayClose} onAdd={handleOverlayAdd} />
          {pantry.map((item, index) => (
            <PantryItem 
              key={item.id} 
              handleDelete={handleDelete}
              item={item}
            />
          ))}
        </ScrollView>
      );
    };

    export default Pantry;