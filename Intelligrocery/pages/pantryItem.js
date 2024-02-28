import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateDocFB } from '../firebase';

export default function PantryItem({item, handleDelete}) {

    const [editing, setEditing] = useState(false);
    // const [editIcon, setEditIcon] = useState("edit"); //Not used
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
        // setEditIcon("edit"); //Not used
        setInputStyling(null);

        await updateDocFB(collectionName = "pantry", documentID = item.dbID, docData = {
            ingredient: currName,
            quantity: parseFloat(currQuantity),
            units: currUnits
        });
        console.log(`Updated ${item.ingredient}`);
        // console.log("New Quantity:", parseFloat(currQuantity));
    };
    
    return (
        <View style={[styles.groceryItem, editing ? styles.editableItem : {}]}>
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
                <TouchableOpacity style={{ marginRight: 0 }} onPress={editing ? handleEdit : () => setEditing(true)} testID="edit-button">
                    <Icon name={editing ? "check" : "edit"} size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Icon name="trash" size={20} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
