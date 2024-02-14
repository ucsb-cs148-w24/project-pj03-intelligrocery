import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    plusButton: {
        backgroundColor: 'tomato',
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        width: 25,
        height: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    overlay: {
        borderRadius: 20,
        width: '45%',
      },
    overlayContent: {
        padding: 20,
        alignItems: 'center',
        gap: 10,
    },
    inputIngredient: {
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        width: '110%',
    },
    inputQuantity:{
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        width: '60%',
    },
    inputUnits: {
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        width: '40%',
    },
    quantityUnits: {
        flexDirection: 'row',
        gap: 10,
    },
    overlayButtons: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
    },
    cancelButtonTitle: {
        color: 'gray'
    },
    addItemButton: {
        backgroundColor: 'tomato',
        borderRadius: 10,
    },
    addIngredientTitle: {
        fontSize: 20,
    },
    groceryItem: {
        width: '100%',
        marginRight: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        // backgroundColor: 'red',
    },
    checkedItem: {
        backgroundColor: '#eee',
    },
    checkedText: {
        textDecorationLine: 'line-through',
    },
    editableItem: {
        backgroundColor: '#eee',

    },
    editableText: {
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderColor: "gray",
        color: "gray",
    },
    checkButton: {
        backgroundColor: 'black',
        borderRadius: 10,
    },
    checkButtonTitle: {
        color: 'white',
        fontSize: 15,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 'auto',
    },
    deleteTitle: {
        color: 'white',
    },
    pantryXButton: {
        backgroundColor: 'red',
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        width: 25,
        height: 25,
    },
    pantryDeleteTitle: {
        color: 'white',
        fontSize: 15,
    },
    search: {
        height: 40,
        borderColor: 'lightgray',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        paddingHorizontal: 10,
        width: '95%',
        // position: 'absolute',
        // bottom: 15,
    },
    recipePageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    recipeCardList: {
        gap: 10,
        maxWidth: '95%',
        wordWrap: 'break-word',
        alignItems: 'center',
    },
    recipeCard: {
        flexDirection: 'row',
        gap: 10,
        padding: 20,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 15,
        width: '100%',
        minwidth: '100%',
        maxWidth: '100%',
        wordWrap: 'break-word',
    },
    recipeDetails: {
        gap: 10
    },
    recipeCardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    recipeCardTitle: {
        fontSize: 18,
        fontWeight: '600',
        maxWidth: '90%',
    },
    recipeCardNumIngredients: {
        
    },
});