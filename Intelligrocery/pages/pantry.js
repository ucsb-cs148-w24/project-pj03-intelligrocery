// // Pantry.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import styles from '../styles/styles';
import AddIngredient from './addIngredient';
import PantryItem from './pantryItem';
import { useNavigation } from '@react-navigation/core'

import { auth, addDocFB, deleteDocFB, queryCollectionFB } from '../firebase'
import { where, orderBy } from "firebase/firestore";

const Pantry = ({ pantry, setPantry }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
      const loadPantry = async () => {
        const queryDocs = await queryCollectionFB(
            collectionName = "pantry",
            whereRef = where("userID", "==", auth.currentUser.uid),
            orderByRef = orderBy("timestamp", "desc")
        );
        const list = [];
        let id = 0;
        queryDocs.forEach(doc => {
            // Assuming doc.data() returns the item object
            list.push({...doc.data(), dbID: doc.id, id});
            id++;
        });
        setPantry(list);
      };
      loadPantry(); // Trigger the async operation
    }, []);

    // Function to be triggered when the button is pressed
    const handleButtonPress = () => {
        setOverlayVisible(true);
    };

    const handleOverlayClose = () => {
        setOverlayVisible(false);
    };

    const handleOverlayAdd = async (ingredient, quantity, units) => {
        setOverlayVisible(false);
        quantity = parseFloat(Number(quantity).toFixed(2))
        id = pantry.length > 0 ? Math.max(...pantry.map(item => item.id)) + 1 : 0;
        setPantry((prevPantry) => [...prevPantry, {ingredient, quantity, units, id}]);
        console.log("Next id in pantry: ", id);
        
        const dbID = await addDocFB(
          docData = {ingredient, quantity: parseFloat(Number(quantity).toFixed(2)), units},
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
        deleteDocFB(collectionName = "pantry", documentID = item.dbID);
        console.log("Deleted pantry item: ", item.ingredient);
      }
    }
    
    // console.log("Pantry list length: ", pantry.length)
    // console.log("Pantry rendering: ", pantry)
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
              setPantry={setPantry}
            />
          ))}
        </ScrollView>
      );
    };

    export default Pantry;
