import { useRef, useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from '../styles/styles';
import { Button } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Spacer } from 'react-native-flex-layout';

export default function GroceryItem({item, toggleCheck, handleDelete, handleAddToPantry}) {
    const [isChecked, setIsChecked] = useState(item.checked);
    const swipeableRef = useRef(null);

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
                    onPress={handleAddToPantry} //handleAddToPantryFromGroceryList
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
                <Text style={isChecked ? styles.checkedText : {}}> {item.ingredient} - {item.quantity} {item.units} </Text>
                <Spacer />
            </View>
        </Swipeable>
    );
};