import { useRef, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { Button } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { updateDocFB } from '../firebase';

export default function GroceryItem({item, toggleCheck, setGroceryList, handleDelete, handleAddToPantry}) {
    const [isChecked, setIsChecked] = useState(item.checked);
    const swipeableRef = useRef(null);
    const [editing, setEditing] = useState(false);
    const [currName, setCurrName] = useState(item.ingredient);
    const [currQuantity, setCurrQuantity] = useState(parseFloat(item.quantity));
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
                        quantity: parseFloat(currQuantity),
                        units: currUnits
                    };
                }
                return groceryItem;
            });
        });

        await updateDocFB(collectionName = "groceryList", documentID = item.dbID, docData = {
            ingredient: currName,
            quantity: parseFloat(currQuantity),
            units: currUnits
        });
        console.log(`Updated ${item.ingredient}`);
        // console.log("New Quantity:", parseFloat(currQuantity));
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
                    titleStyle={styles.deleteTitle} //same font as delete button
                    onPress={() => handleAddToPantry(item.id)} //handleAddToPantryFromGroceryList
                    title="Add to pantry"
                />

                <Button
                    buttonStyle={styles.deleteButton}
                    titleStyle={styles.deleteTitle}
                    onPress={() => handleDelete(item.id)}
                    title="Delete"
                />
            </Animated.View>
        );
    };

    return (
        <Swipeable ref = {swipeableRef} friction={2} renderRightActions={renderRightAction}>
            <View style={[styles.groceryItem, isChecked ? styles.checkedItem : {}]}>
                <BouncyCheckbox onPress={handleToggleCheck} fillColor='tomato' isChecked={isChecked} />
                <View style={[styles.groceryItem2, editing ? styles.editableItem : {}]}>
                    <TextInput 
                        style={inputStyling}
                        editable={editing}
                        onChangeText={text => setCurrName(text)}
                        value={currName}
                    />
                    <TextInput 
                        style={inputStyling}
                        editable={editing}
                        onChangeText={text => setCurrQuantity(parseFloat(text))}
                        value={isNaN(currQuantity) ? '' : String(currQuantity)}
                    />
                    <TextInput 
                        style={inputStyling}
                        editable={editing}
                        onChangeText={text => setCurrUnits(text)}
                        value={currUnits}
                    />
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
