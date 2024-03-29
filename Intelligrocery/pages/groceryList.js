// // GroceryList.js

//React
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/core'
import { showMessage } from "react-native-flash-message"

//Pages
import AddIngredient from './addIngredient';
import GroceryItem from './groceryItem';
import { useGroceryList } from '../context/groceryListContext';

//Firebase
import { auth, addDocFB, updateDocFB, deleteDocFB, queryCollectionFB } from '../firebase'
import { where, orderBy } from "firebase/firestore";


//timestamp: serverTimestamp()
const GroceryList = ({ setPantry, pantry }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const navigation = useNavigation();
    const { groceryList, setGroceryList } = useGroceryList();
    // const isMounted = useRef(false); // Ref to track whether the component is mounted or not

    useEffect(() => {
      // if (!isMounted.current) {
      //   isMounted.current = true; // Set isMounted to true after the initial render
      // }
      const loadGroceryList = async () => {
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
        quantity = parseFloat(Number(quantity).toFixed(2))
        print(typeof quantity)
        // const id = Math.random().toFixed(16).slice(2)
        id = groceryList.length > 0 ? Math.max(...groceryList.map(item => item.id)) + 1 : 0;
        setGroceryList((prevGroceryList) => [{ingredient, quantity, units, id}, ...prevGroceryList]);

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

    const handleDeleteSelected = async () => {
      deletedList = groceryList.filter(item => item.checked);
      setGroceryList(groceryList.filter(item => !item.checked));
      deletedList.forEach(item => {
        deleteDocFB(collectionName = "groceryList", documentID = item.dbID);
        console.log("Deleted grocery list item: ", item.ingredient);
      });
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
        await updateDocFB("groceryList", item.dbID, { checked: item.checked });
    };

    const handleDelete = (id, hideMessage = false) => {
      if (!hideMessage) {
        showMessage({
          message: `Deleted ${groceryList.find(item => item.id === id).ingredient} from Grocery List!`,
          type: "info",
          style: { backgroundColor: 'tomato' },
          titleStyle: { color: 'white', textAlign: 'center', fontWeight: 'bold' }, 
        });      
      }
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
    };

    const handleAddToPantry = async (id) => {
      let groceryListID = id; //Keeping the variable here since it seemed to become undefined otherwise, global variable issue
      // Find the item in the grocery list
      let groceryIndex = groceryList.findIndex((item) => item.id === id);
      if (groceryIndex !== -1) {
        const groceryItem = groceryList[groceryIndex];
        // Check if the item exists in the pantry
        const pantryIndex = pantry.findIndex((pantryItem) => (pantryItem.ingredient === groceryItem.ingredient) && (pantryItem.units === groceryItem.units));
        if (pantryIndex !== -1) {
          // Units are compatible, update quantity
          pantryItem = pantry[pantryIndex];
          const updatedQuantity = pantryItem.quantity + groceryItem.quantity;
          // Update item in pantry
          setPantry((prevPantry) => {
            const updatedPantry = prevPantry.map((item, index) => {
                if (index === pantryIndex) {
                  console.log(item.ingredient)
                    return { ...item, quantity: updatedQuantity };
                }
                return item;
            });
            // console.log(updatedPantry); // Log the updated state here
            return updatedPantry;
          });
          handleDelete(groceryListID, true);
          //We don't want to add the list id in the database
          const { id, ...updatedPantryItem } = pantry[pantryIndex];
          console.log(updatedPantryItem)
          await updateDocFB(collectionName = "pantry", documentID = updatedPantryItem.dbID, data = updatedPantryItem);
        } else {
          // Item does not exist in pantry, add it as new
          groceryIndex = pantry.length > 0 ? Math.max(...pantry.map(item => item.id)) + 1 : 0
          setPantry((prevPantry) => [...prevPantry, { ...groceryItem, id: groceryIndex}]);
          handleDelete(groceryListID, true);
          const dbID = await addDocFB(
            docData = groceryItem,
            collectionName = "pantry");
            console.log("Added to pantry: ", groceryItem.ingredient);
            setPantry(prevList => { //calling setPantry seems to let the past set finish first
              const updatedList = prevList.map(item => {
                  if (item.id === groceryIndex) {
                      return { ...item, dbID };
                  }
                  return item;
              });
            return updatedList;
        });
        }
        showMessage({
          message: `Added ${groceryList.find(item => item.id === id).ingredient} to Pantry!`,
          type: "info",
          style: { backgroundColor: 'tomato' },
          titleStyle: { color: 'white', textAlign: 'center', fontWeight: 'bold' }, 
        });
      }
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
              setGroceryList={setGroceryList}
            />
          ))}
        </ScrollView>
      );
    };
    export default GroceryList;