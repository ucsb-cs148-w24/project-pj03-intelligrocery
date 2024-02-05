import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const PantryItem = ({ initName, initQuantity, initUnit, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [editIcon, setEditIcon] = useState("edit");
    const [inputStyling, setInputStyling] = useState(styles.text);
    const [currName, setCurrName] = useState(initName);
    const [currQuantity, setCurrQuantity] = useState(initQuantity);
    const [currUnit, setCurrUnit] = useState(initUnit);

    const onEdit = () => {
        setEditing(!editing);
        setEditIcon(editing ? "edit" : "check");
        setInputStyling(editing ? styles.text : styles.editText);
    };

    return (
        <View style={styles.item}>
            <View style={styles.nameWrapper}>
                <TextInput 
                    style={inputStyling} 
                    editable={editing}
                    onChangeText={(text) => setCurrName(text)}>
                        {currName}
                </TextInput>
            </View>
            <View style={styles.detailsWrapper}>
                <TextInput 
                    style={inputStyling} 
                    editable={editing}
                    onChangeText={(text) => setCurrQuantity(text)}>
                        {currQuantity}
                </TextInput>
            </View>
            <View style={styles.detailsWrapper}>
                <TextInput 
                    style={inputStyling} 
                    editable={editing}
                    onChangeText={(text) => setCurrUnit(text)}>
                        {currUnit}
                </TextInput>
            </View>
            <View>
                <TouchableOpacity style={{ marginRight: 20 }} onPress={onEdit}>
                    <Icon name={editIcon} size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={onDelete}>
                    <Icon name="trash" size={20} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 15,
        borderRadius: 10,
        margin: 10,
    },
    nameWrapper: {
        width: "40%",
        margin: 3,
    },
    detailsWrapper: {
        flex: 1,
        margin: 3,
        textAlign: "right",
    },
    text: {
        fontSize: 15,
    },
    editText: {
        fontSize: 15,
        color: "gray",
        borderBottomWidth: 1,
        borderColor: "gray",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default PantryItem;