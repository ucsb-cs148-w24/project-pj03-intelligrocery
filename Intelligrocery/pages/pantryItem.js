import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Animated} from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import { updateDocFB } from '../firebase';

export default function PantryItem({item, handleDelete, setPantry}) {

    const [editing, setEditing] = useState(false);
    const swipeableRef = useRef(null);
    const [currName, setCurrName] = useState(item.ingredient);
    const [currQuantity, setCurrQuantity] = useState(parseFloat(item.quantity));
    const [currUnits, setCurrUnits] = useState(item.units);
    const [inputStyling, setInputStyling] = useState(null);
    // console.log("Current quantity: ", currQuantity)

    useEffect(() => {
        // console.log("Quantity it sees: ", item.quantity)
        setCurrQuantity(item.quantity);
    }, [item.quantity]);

    const handleEdit = async () => {
        setEditing(false);
        setInputStyling(null);

        setPantry(prevPantry => {
            return prevPantry.map(pantryItem => {
                if (pantryItem.id === item.id) {
                    return {
                        ...pantryItem,
                        ingredient: currName,
                        quantity: parseFloat(currQuantity),
                        units: currUnits
                    };
                }
                return pantryItem;
            });
        });

        await updateDocFB(collectionName = "pantry", documentID = item.dbID, docData = {
            ingredient: currName,
            quantity: parseFloat(currQuantity),
            units: currUnits
        });
        console.log(`Updated ${item.ingredient}`);
        // console.log("New Quantity:", parseFloat(currQuantity));
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
                    titleStyle={styles.deleteTitle}
                    onPress={() => handleDelete(item.id)}
                    title="Delete"
                />
            </Animated.View>
        );
    };
    
    return (
        <Swipeable ref = {swipeableRef} friction={2} renderRightActions={renderRightAction}>
            <View style={[styles.groceryItem, editing ? styles.editableItem : {}]}>
                <TextInput 
                    style={styles.nameInput}
                    editable={editing}
                    onChangeText={text => setCurrName(text)}
                    value={currName}
                />
                <TextInput 
                    style={styles.quantityInput}
                    editable={editing}
                    onChangeText={text => setCurrQuantity(parseFloat(text))}
                    value={isNaN(currQuantity) ? '' : String(currQuantity)}
                />
                <TextInput 
                    style={styles.unitsInput}
                    editable={editing}
                    onChangeText={text => setCurrUnits(text)}
                    value={currUnits}
                />
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


