import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PantryItem from "./PantryItem";

function PantryScreen() {
  const [pantryItems, setPantryItems] = useState([]);
  const [pantryName, setPantryName] = useState("");
  const [pantryQuantity, setPantryQuantity] = useState("");
  const [pantryUnit, setPantryUnit] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  const toggleInputVisibility = () => {
    setInputVisible(!inputVisible);
  };

  const addPantryItem = () => {
    if (pantryName.trim() !== "") {
      setPantryItems([
        ...pantryItems,
        { name: pantryName, quantity: pantryQuantity, unit: pantryUnit },
      ]);
      setPantryName("");
      setPantryQuantity("");
      setPantryUnit("");
      setInputVisible(false);
    }
  };

  const deletePantryItem = (index) => {
    const newPantryItems = [...pantryItems];
    newPantryItems.splice(index, 1);
    setPantryItems(newPantryItems);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleInputVisibility}>
        <Text>+</Text>
      </TouchableOpacity>
      {inputVisible && (
        <View style={styles.inputContainer}>
          <View>
            <Text>Ingredient:</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Ingredient..."
              value={pantryName}
              onChangeText={(text) => setPantryName(text)}
            />
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text>Quantity:</Text>
              <TextInput
                style={styles.detailsInput}
                placeholder="Quantity..."
                value={pantryQuantity}
                onChangeText={(text) => setPantryQuantity(text)}
              />
            </View>
            <View>
              <Text>Unit:</Text>
              <TextInput
                style={styles.detailsInput}
                placeholder="Unit..."
                value={pantryUnit}
                onChangeText={(text) => setPantryUnit(text)}
              />
            </View>
          </View>
          <TouchableOpacity onPress={addPantryItem} style={styles.addItem}>
            <Text style={styles.addItemText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView>
        {pantryItems.map((item, index) => (
          <PantryItem
            key={index}
            name={item.name}
            quantity={item.quantity}
            unit={item.unit}
            onDelete={() => deletePantryItem(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  detailsInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 150,
  },
  addItem: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addItemText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default PantryScreen;