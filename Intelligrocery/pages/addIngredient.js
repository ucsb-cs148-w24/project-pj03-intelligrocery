// addIngredient.js
import React, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import styles from '../styles/styles';

const AddIngredient = ({ isVisible, onClose, onAdd }) => {
    const [ingredient, setIngredient] = useState('');
    const [quantity, setQuantity] = useState('');
    const [units, setUnits] = useState('');
  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose} overlayStyle={styles.overlay}>
      <View style={styles.overlayContent}>
        <Text style = {styles.addIngredientTitle} >Add Ingredient</Text>
        <TextInput
          style={styles.inputIngredient}
          onChangeText={text=>setIngredient(text)}
          placeholder="Ingredient Name"
          placeholderTextColor="#A9A9A9"
        />
        <View style={styles.quantityUnits}>
            <TextInput
            style={styles.inputQuantity}
            onChangeText={text=>setQuantity(text)}
            placeholder="Quantity"
            placeholderTextColor="#A9A9A9"
            />
            <TextInput
            style={styles.inputUnits}
            onChangeText={text=>setUnits(text)}
            placeholder="Units"
            placeholderTextColor="#A9A9A9"
        />
        </View>
        <View style={styles.overlayButtons}>
            <Button title="Cancel" onPress={onClose} buttonStyle = {styles.cancelButton} titleStyle = {styles.cancelButtonTitle} />
            <Button title="Add" onPress={() => {
                onAdd(ingredient, quantity, units);
                setIngredient('');
                setQuantity('');
                setUnits('');
                onClose
            }} buttonStyle = {styles.addItemButton} />
        </View>
      </View>
    </Overlay>
  );
};

export default AddIngredient;