import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import { Button } from 'react-native-elements';

export default function PantryItem({item, handleDelete}) {
    
    return (
        <View style={[styles.groceryItem, item.checked ? styles.checkedItem : {}]}>
            <Text style={item.checked ? styles.checkedText : {}}> {item.ingredient} - {item.quantity} {item.units} </Text>
            <Button
                buttonStyle={styles.pantryXButton}
                titleStyle={styles.pantryDeleteTitle}
                onPress={handleDelete}
                title="x"/>
        </View>
    );
    }