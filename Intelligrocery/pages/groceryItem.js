import { useRef, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { Swipeable } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { updateDocFB } from '../firebase';

export default function GroceryItem({item, toggleCheck, setGroceryList, handleDelete, handleAddToPantry}) {
    const [isChecked, setIsChecked] = useState(item.checked);
    const swipeableRef = useRef(null);
    const [editing, setEditing] = useState(false);
    const [currName, setCurrName] = useState(item.ingredient);
    const [currQuantity, setCurrQuantity] = useState(item.quantity);
    const [currUnits, setCurrUnits] = useState(item.units);
    const [inputStyling, setInputStyling] = useState(null);

    useEffect(() => {
        // console.log("Quantity it sees: ", item.quantity)
        setCurrQuantity(item.quantity);
    }, [item.quantity]);

    const handleEdit = async () => {
        setEditing(false);
        setInputStyling(null);

        setGroceryList(prevGroceryList => {
            return prevGroceryList.map(groceryItem => {
                if (groceryItem.id === item.id) {
                    return {
                        ...groceryItem,
                        ingredient: currName,
                        quantity: parseFloat(Number(currQuantity).toFixed(2)),
                        units: currUnits
                    };
                }
                return groceryItem;
            });
        });

        await updateDocFB(collectionName = "groceryList", documentID = item.dbID, docData = {
            ingredient: currName,
            quantity: parseFloat(Number(currQuantity).toFixed(2)),
            units: currUnits
        });
        console.log(`Updated ${item.ingredient}`);
    };
    
    useEffect(() => {
        setIsChecked(item.checked);
    }, [item.checked]);

    const handleToggleCheck = () => {
        toggleCheck(item.id, !isChecked);
        setIsChecked(!isChecked);
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
                    buttonStyle={styles.addToPantryButton}
                    onPress={() => handleAddToPantry(item.id)}
                    icon={
                        <Image
                            source={require('../assets/addtopantry.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    }
                />
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
            <View style={[styles.groceryItem, isChecked ? styles.checkedItem : {}]}>
                <BouncyCheckbox onPress={handleToggleCheck} fillColor='tomato' isChecked={isChecked} />
                <View style={[styles.groceryItem2]}>
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
                                setCurrQuantity(parseFloat(Number(text).toFixed(2)));
                            }
                        }}
                        value={isNaN(currQuantity) ? '' : (currQuantity == 0) ? "" : String(+(currQuantity))}
                        keyboardType="numeric"
                    />
                    <View style={styles.unitsInput}>
                        <RNPickerSelect
                            value={currUnits ? currUnits.toString() : ''}
                            placeholder={{
                                label: "",
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
                        <TouchableOpacity style={{ marginRight: 50
                         }} onPress={editing ? handleEdit : () => setEditing(true)} testID="edit-button">
                            <Icon name={editing ? "check" : "edit"} size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Swipeable>
    );
};
