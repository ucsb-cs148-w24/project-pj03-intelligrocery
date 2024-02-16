// // Pantry.js
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import styles from '../styles/styles';
import AddIngredient from './addIngredient';
import PantryItem from './pantryItem';

import { addDocFB, deleteDocFB } from '../firebase'

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

    const handleOverlayAdd = async (ingredient, quantity, units) => {
        setOverlayVisible(false);
        const id = pantry.length > 0 ? Math.max(...pantry.map(item => item.id)) + 1 : 0;
        setPantry([{ingredient, quantity, units, id}, ...pantry]);
        console.log("Next id in pantry: ", id);
        try {
          const dbID = await addDocFB(
              data = {ingredient, quantity : quantity,unit : units},
            collectionName = "pantry");
            console.log("Added to pantry: ", ingredient);
            setPantry(prevList => { //calling setPantry seems to let the past set finish first
              const updatedList = prevList.map(item => {
                  if (item.id === id) {
                      return { ...item, dbID };
                  }
                  return item;
              });
            return updatedList;
        });
        } catch(error) {
          Alert.alert("There seems to have been an issue adding your pantry item to the database.")
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
      console.log("Id to try and delete from pantry: ", id)
      const index = pantry.findIndex((item) => item.id === id);
      if (index != -1) {
        const newPantry = [...pantry];
        const item = newPantry[index]
        newPantry.splice(index, 1);
        setPantry(newPantry);
        try {
          deleteDocFB(collectionName = "pantry", documentID = item.dbID);
          console.log("Deleted pantry item: ", item.ingredient);
        } catch (error) {
          Alert.alert("There seems to have been an issue deleting your grocery list item from the database.")
          console.log(error.message);
        }
      }
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