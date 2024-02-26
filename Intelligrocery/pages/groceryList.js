// // GroceryList.js

//React
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/core'

//Pages
import AddIngredient from './addIngredient';
import GroceryItem from './groceryItem';

//Firebase
import { auth, addDocFB, updateDocFB, deleteDocFB, queryCollectionFB } from '../firebase'
import { where, orderBy } from "firebase/firestore";


//timestamp: serverTimestamp()
const GroceryList = ({ groceryList, setGroceryList }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const navigation = useNavigation();
    // const isMounted = useRef(false); // Ref to track whether the component is mounted or not

    useEffect(() => {
      // if (!isMounted.current) {
      //   isMounted.current = true; // Set isMounted to true after the initial render
      // }
      const loadGroceryList = async () => {
        try {
          if (auth.currentUser) {
          console.log("User: ", auth.currentUser.uid)
          const queryDocs = await queryCollectionFB(
            "groceryList",
            where("userID", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc")
          );
          console.log("Done querying docs");
          const list = [];
          let id = 0;
          queryDocs.forEach(doc => {
            // Assuming doc.data() returns the item object
            list.push({...doc.data(), dbID: doc.id, id});
            id++;
          });
          const checkedList = list.filter((item) => item.checked);
          const uncheckedList = list.filter((item) => !item.checked);
          setGroceryList([...uncheckedList, ...checkedList]);
          // console.log("Done toggling docs");
        }
        } catch (error) {
          Alert.alert("We seemed to have a problem loading your grocery list");
          console.error("Error loading grocery list: ", error);
        }
      };
      loadGroceryList(); // Trigger the async operation
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
        // const id = Math.random().toFixed(16).slice(2)
        const id = groceryList.length > 0 ? Math.max(...groceryList.map(item => item.id)) + 1 : 0;
        setGroceryList([{ingredient, quantity, units, id}, ...groceryList]);
        console.log("Next id in groceryList: ", id);
        try {
            const dbID = await addDocFB(
                data = {
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
        } catch (error) {
          Alert.alert("There seems to have been an issue adding your grocery list item to the database.")
          console.log(error.message);
      }
      };

    const handleDeleteSelected = () => {
      setGroceryList(groceryList.filter(item => !item.checked));
    };

    React.useLayoutEffect(() => {
      navigation.setOptions({
          headerLeft: () => (
              <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                  <TouchableOpacity onPress={handleDeleteSelected} style={styles.plusButton}>
                      <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
              </View>
          ),
      });
  }, [navigation, groceryList]); // Add groceryList to the dependency array to re-render when items are checked/unchecked

    React.useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={handleButtonPress} style = {styles.plusButton}>
                <Text style = {styles.buttonText}>+</Text>
            </TouchableOpacity>
        ),
        });
    }, [navigation]);


    const toggleCheck = async (id) => {
        const index = groceryList.findIndex((item) => item.id === id);
        const newGroceryList = [...groceryList];
        newGroceryList[index].checked = !newGroceryList[index].checked;
        checkedList = newGroceryList.filter(item => item.checked);
        uncheckedList = newGroceryList.filter(item => !item.checked);
        setGroceryList([...uncheckedList, ...checkedList]);  
        const item = newGroceryList[index];
        try {
          await updateDocFB("groceryList", item.dbID, { checked: item.checked });
        } catch (error) {
          Alert.alert("There seems to have been an issue updating your item in the database.");
          console.log(error.message);
        }
    };

    const handleDelete = (id) => {
      console.log("Id to try and delete from grocery list: ", id)
      const index = groceryList.findIndex((item) => item.id === id);
      if (index != -1) {
        const newGroceryList = [...groceryList];
        const item = newGroceryList[index]
        newGroceryList.splice(index, 1);
        setGroceryList(newGroceryList);
        try {
          deleteDocFB(collectionName = "groceryList", documentID = item.dbID);
          console.log("Deleted grocery list item: ", item.ingredient);
        } catch (error) {
          Alert.alert("There seems to have been an issue deleting your grocery list item from the database.")
          console.log(error.message);
        }
      }
    };

    const handleAddToPantry = (id) => {
        //console.log("clicked add to pantry button");
        const index = groceryList.findIndex((item) => item.id === id);
        //ingredient = groceryList[index].
        setPantry([{ingredient, quantity, units, id}, ...pantry]);
    };
    
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
              handleAddToPantry={handleAddToPantry}
            />
          ))}
        </ScrollView>
      );
    };
    export default GroceryList;