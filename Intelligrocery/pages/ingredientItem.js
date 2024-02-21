import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from '../styles/styles';
import { Button } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Spacer } from 'react-native-flex-layout';

export default function IngredientItem({item, toggleCheck, handleDelete}) {
    
    const swipeableRef = React.useRef(null);


    const renderRightAction = (progress, dragX) => {
        const threshold = 100;
        const scale = dragX.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View style={{ transform: [{ scale }] }}>
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
            <View style={[styles.groceryItem, item.checked ? styles.checkedItem : {}]}>
                <BouncyCheckbox onPress={() => toggleCheck(item.id)} fillColor='tomato'/>
                <Text style={item.checked ? styles.checkedText : {}}> {item.ingredient} - {item.quantity} {item.units} </Text>
                <Spacer />
            </View>
        </Swipeable>
    );
    }