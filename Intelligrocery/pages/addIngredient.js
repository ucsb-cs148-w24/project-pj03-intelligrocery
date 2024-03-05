// addIngredient.js
import React, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import styles from '../styles/styles';
import RNPickerSelect from 'react-native-picker-select';

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
            onChangeText={(text) => {
              const decimalRegex = /^\d*(\.\d{0,2})?$/;
              if (decimalRegex.test(text) || text === '') {
                setQuantity(text);
              }
            }}
            value={quantity}
            placeholder="Quantity"
            placeholderTextColor="#A9A9A9"
            keyboardType="numeric"
            />
          <RNPickerSelect
              placeholder={{ label: "Unit", value: null, color: '#A9A9A9' }}
              onValueChange={(value) => setUnits(value)}
              items={[
                  { label: 'count', value: 'ct' },
                  { label: 'tablespoon', value: 'tbsp' },
                  { label: 'teaspoon', value: 'tsp' },
                  { label: 'ounce', value: 'oz' },
                  { label: 'pound', value: 'lb' },
                  { label: 'gram', value: 'g' },
                  { label: 'kilogram', value: 'kg' },
                  { label: 'cup', value: 'c' },
                  { label: 'pint', value: 'pt' },
                  { label: 'gallon', value: 'gal' },
                  { label: 'dozen', value: 'doz' },
                  { label: 'package', value: 'pkg' },
              ]}
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOS: styles.inputUnits,
                inputAndroid: styles.inputUnits, 
                placeholder: { color: '#A9A9A9' },
            }}
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