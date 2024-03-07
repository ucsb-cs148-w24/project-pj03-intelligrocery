import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { useGroceryList } from '../context/groceryListContext';
import { addDocFB, updateDocFB } from '../firebase'

export default function RecipeItem({ ingredient, quantity, units }) {
  if (units == '<unit>') {
      units = 'count';
  }
  quantity = parseFloat(Number(quantity).toFixed(2))

  const { groceryList, setGroceryList } = useGroceryList();

  const handleAddToGrocery = async () => {
  // Check if the item exists in the pantry
  //not calling it id since there seems to be some global variable issue where it becomes undefined soon
  let groceryListID = groceryList.findIndex((item) => item.ingredient === ingredient && item.units === units);
  if (groceryListID !== -1) {
    // Units are compatible, update quantity
    const groceryItem = groceryList[groceryListID];
    const updatedQuantity = parseFloat(Number((groceryItem.quantity + quantity)).toFixed(2));
    // Update item in grocery list
    setGroceryList((prevGroceryList) => {
      const updatedGroceryList = prevGroceryList.map((item, index) => {
          if (index === groceryListID) {
              return { ...item, quantity: updatedQuantity };
          }
          return item;
      });
      return updatedGroceryList;
    });
    //We don't want to add variable list id in the database
    // console.log("Updating database with quantity: ", updatedGroceryItem.quantity)
    const { id, ...updatedGroceryItem } = groceryList[groceryListID];
    updatedGroceryItem.quantity = updatedQuantity //since setGroceryList occurs asynchronously
    console.log(updatedGroceryItem)
    await updateDocFB(collectionName = "groceryList", documentID = updatedGroceryItem.dbID, data = updatedGroceryItem);
  } else {
    groceryListID = groceryList.length > 0 ? Math.max(...groceryList.map(item => item.id)) + 1 : 0;
    setGroceryList((prevGroceryList) => [{ingredient, quantity, units, id: groceryListID}, ...prevGroceryList]);
    console.log("Next id in groceryList: ", groceryListID);
      const dbID = await addDocFB(
        docData = {
            ingredient,
            quantity,
            units,
            checked : false,
          },
        collectionName = "groceryList");
        console.log("Added to grocery list: ", ingredient);
        setGroceryList(prevList => { //calling setGroceryList seems to let the past set finish first
          const updatedList = prevList.map(item => {
              if (item.id === groceryListID) {
                  return { ...item, dbID };
              }
              return item;
          });
        console.log("Made this item have dbID: ", dbID)
        return updatedList;
  });
  }
  }
  
  return (
    <View style={styles.recipeItem}>
        <Text style={styles.ingredientText}>{quantity == 0 ? (units == null ? `${ingredient}` : `${units} ${ingredient}`) : `${+quantity} ${units} ${ingredient}`}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToGrocery}>
            <Icon name="plus" size={10} color="white" />
        </TouchableOpacity>
    </View>
  );
}
