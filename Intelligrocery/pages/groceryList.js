// // GroceryList.js

//React
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../styles/styles';

//Pages
import AddIngredient from './addIngredient';
import GroceryItem from './groceryItem';

//Firebase
import { addDocFB, deleteDocFB } from '../firebase'


//timestamp: serverTimestamp()
const GroceryList = ({ navigation }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [groceryList, setGroceryList] = useState([]); //will be a list of DB references instead

    //db queries and initialize groceryList, after we write to database

    // Function to be triggered when the button is pressed
    const handleButtonPress = () => {
        setOverlayVisible(true);
    };

    const handleOverlayClose = () => {
        setOverlayVisible(false);
    };

    const handleOverlayAdd = async (ingredient, quantity, units) => {
        setOverlayVisible(false);
        // const id = Math.random().toFixed(16).slice(2)
        const id = groceryList.length > 0 ? Math.max(...groceryList.map(item => item.id)) + 1 : 0;
        setGroceryList([{ingredient, quantity, units, id}, ...groceryList]);
        console.log("Next id in groceryList: ", id);
        const dbID = await addDocFB(
            data = {
              ingredient,
              quantity,
              units,
              isChecked : false,
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
        deleteDocFB(collectionName = "groceryList", documentID = item.dbID);
        console.log("Deleted grocery list item: ", item.ingredient);
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
            <GroceryItem 
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