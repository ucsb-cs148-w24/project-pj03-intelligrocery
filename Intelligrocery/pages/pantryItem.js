import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Animated} from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import { updateDocFB } from '../firebase';

export default function PantryItem({item, handleDelete, setPantry}) {

    const [editing, setEditing] = useState(false);
    const swipeableRef = useRef(null);
    const [currName, setCurrName] = useState(item.ingredient);
    const [currQuantity, setCurrQuantity] = useState(parseFloat(item.quantity).toFixed(2));
    const [currUnits, setCurrUnits] = useState(item.units);
    const [inputStyling, setInputStyling] = useState(null);
    // console.log("Current quantity: ", currQuantity)

    useEffect(() => {
        // console.log("Quantity it sees: ", item.quantity)
        setCurrQuantity(item.quantity);
    }, [item.quantity]);

    const handleEdit = async () => {
        console.log(currUnits);
        setEditing(false);
        setInputStyling(null);

        setPantry(prevPantry => {
            return prevPantry.map(pantryItem => {
                if (pantryItem.id === item.id) {
                    return {
                        ...pantryItem,
                        ingredient: currName,
                        quantity: parseFloat(currQuantity).toFixed(2),
                        units: currUnits
                    };
                }
                return pantryItem;
            });
        });

        await updateDocFB(collectionName = "pantry", documentID = item.dbID, docData = {
            ingredient: currName,
            quantity: parseFloat(currQuantity).toFixed(2),
            units: currUnits
        });
        console.log(`Updated ${item.ingredient}`);
    };

    const renderRightAction = (progress, dragX) => {
        const threshold = 100;
        const scale = dragX.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View style={{ transform: [{ scale }], flexDirection: 'row' }}>
                <Button
                    buttonStyle={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                    icon={
                        <Icon
                            name='trash'
                            color='white'
                            size={30}
                        />
                    }
                />
            </Animated.View>
        );
    };
    
    return (
        <Swipeable ref = {swipeableRef} friction={2} renderRightActions={renderRightAction}>
            <View style={[styles.groceryItem]}>
                <TextInput 
                    placeholder={editing ? "ingredient" : ""}
                    style={styles.nameInput}
                    editable={editing}
                    onChangeText={text => setCurrName(text)}
                    value={currName}
                />
                <TextInput 
                    placeholder={editing ? "quantity" : ""}
                    style={styles.quantityInput}
                    editable={editing}
                    onChangeText={(text) => {
                        const decimalRegex = /^\d*(\.\d{0,2})?$/;
                        if (decimalRegex.test(text) || text === '') {
                            setCurrQuantity(parseFloat(text).toFixed(2));
                        }
                    }}
                    value={isNaN(currQuantity) ? '' : (currQuantity == 0) ? "" : String(+(currQuantity))}
                    keyboardType="numeric"
                />
                <View style={styles.unitsInput}>
                        <RNPickerSelect
                            value={currUnits ? currUnits.toString() : ''}
                            placeholder={{
                                label: editing? "unit" : "",
                                value: null,
                                color: '#A9A9A9' 
                            }}
                            onValueChange={(value) => setCurrUnits(value)}
                            items={[
                                { label: 'ct', value: 'count' },
                                { label: 'tbsp', value: 'tablespoon' },
                                { label: 'tsp', value: 'teaspoon' },
                                { label: 'oz', value: 'ounce' },
                                { label: 'lb', value: 'pound' },
                                { label: 'g', value: 'gram' },
                                { label: 'kg', value: 'kilogram' },
                                { label: 'c', value: 'cup' },
                                { label: 'pt', value: 'pint' },
                                { label: 'gal', value: 'gallon' },
                                { label: 'doz', value: 'dozen' },
                                { label: 'pkg', value: 'package' },
                            ]}
                            useNativeAndroidPickerStyle={false}
                            style={{
                                inputIOS: styles.unitsInput,
                                inputAndroid: styles.unitsInput, 
                                placeholder: { color: '#A9A9A9' },
                            }}
                        />
                    </View>
                <View>
                    <TouchableOpacity style={{ marginRight: 0
                    }} onPress={editing ? handleEdit : () => setEditing(true)} testID="edit-button">
                        <Icon name={editing ? "check" : "edit"} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
        </Swipeable>
    );
}


