import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PantryItem({item, handleDelete}) {

    const [editing, setEditing] = useState(false);
    const [editIcon, setEditIcon] = useState("edit");
    const [currName, setCurrName] = useState(item.ingredient);
    const [currQuantity, setCurrQuantity] = useState(item.quantity);
    const [currUnit, setCurrUnit] = useState(item.units);
    const [inputStyling, setInputStyling] = useState(null);

    const onEdit = () => {
        setEditing(!editing);
        setEditIcon(editing ? "edit" : "check");
        setInputStyling(editing ? null : styles.editableText);
    };
    
    return (
        <View style={[styles.groceryItem, editing ? styles.editableItem : {}]}>
            <TextInput 
                style={inputStyling}
                editable={editing}
                onChangeText={(text) => setCurrName(text)}>
                    {currName}
            </TextInput>
            <TextInput 
                style={inputStyling}
                editable={editing}
                onChangeText={(text) => setCurrQuantity(text)}>
                    {currQuantity}
            </TextInput>
            <TextInput 
                style={inputStyling}
                editable={editing}
                onChangeText={(text) => setCurrUnit(text)}>
                    {currUnit}
            </TextInput>
            <View>
                <TouchableOpacity style={{ marginRight: 0 }} onPress={onEdit}>
                    <Icon name={editIcon} size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={handleDelete}>
                    <Icon name="trash" size={20} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );
}