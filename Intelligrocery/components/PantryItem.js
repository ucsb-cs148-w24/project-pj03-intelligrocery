import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const PantryItem = ({ name, quantity, unit, onDelete }) => {
    return (
        <View style={styles.item}>
            <View style={styles.textWrapper}>
                <TextInput style={styles.text} editable={false}>{name}</TextInput>
            </View>
            <View style={styles.textWrapper}>
                <TextInput style={styles.text} editable={false}>{quantity} {unit}</TextInput>
            </View>
            <View>
                <TouchableOpacity style={{ marginRight: 20 }}>
                    <Icon name="edit" size={20} color="gray" />
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
    textWrapper: {
        flex: 1,
    },
    text: {
        fontSize: 18,
    },
});

export default PantryItem;