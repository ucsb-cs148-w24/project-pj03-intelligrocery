import React from 'react';
import AddIngredient from './addIngredient';
import { render, fireEvent } from '@testing-library/react-native';
import PantryItem from './pantryItem'; // Adjust the import path as necessary

jest.useFakeTimers();

describe('PantryItem', () => {
  const mockHandleDelete = jest.fn();
  const mockItem = {
    id: '1',
    ingredient: 'Tomatoes',
    quantity: '2',
    units: 'lbs',
    checked: false,
  };

  it('renders the item details correctly', () => {
    const { getByDisplayValue } = render(<PantryItem item={mockItem} handleDelete={mockHandleDelete} />);
    expect(getByDisplayValue(mockItem.ingredient)).toBeTruthy();
    expect(getByDisplayValue(mockItem.quantity)).toBeTruthy();
    expect(getByDisplayValue(mockItem.units)).toBeTruthy();
  });

  it('allows toggling edit mode', () => {
    const { getByTestId, queryByDisplayValue } = render(<PantryItem item={mockItem} handleDelete={mockHandleDelete} />);

    // Assume your edit button has a testID, add this to your component for the test
    const editButton = getByTestId('edit-button');
    fireEvent.press(editButton);

    // Verify if edit mode is on by checking if the text inputs are now editable
    // This assumes your TextInput for the ingredient name becomes editable
    const editableName = queryByDisplayValue(mockItem.ingredient);
    expect(editableName.props.editable).toBe(true);
  });

  it('allows editing item details', () => {
    const { getByTestId, getByDisplayValue } = render(<PantryItem item={mockItem} handleDelete={mockHandleDelete} />);
    fireEvent.press(getByTestId('edit-button')); // Toggle edit mode on

    // Change the ingredient name
    const nameInput = getByDisplayValue(mockItem.ingredient);
    fireEvent.changeText(nameInput, 'Potatoes');

    // Change quantity
    const quantityInput = getByDisplayValue(mockItem.quantity);
    fireEvent.changeText(quantityInput, '3');

    // Change unit
    const unitInput = getByDisplayValue(mockItem.units);
    fireEvent.changeText(unitInput, 'kg');

    // Check if the changes are reflected
    expect(getByDisplayValue('Potatoes')).toBeTruthy();
    expect(getByDisplayValue('3')).toBeTruthy();
    expect(getByDisplayValue('kg')).toBeTruthy();
  });

  // Additional tests can be added here as needed
});

describe('AddIngredient', () => {
  it('allows adding an ingredient', () => {
    const mockOnAdd = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <AddIngredient
        isVisible={true}
        onClose={() => {}}
        onAdd={mockOnAdd}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Ingredient Name'), 'Tomato');
    fireEvent.changeText(getByPlaceholderText('Quantity'), '2');
    fireEvent.changeText(getByPlaceholderText('Units'), 'lbs');

    fireEvent.press(getByText('Add'));

    expect(mockOnAdd).toHaveBeenCalledWith('Tomato', '2', 'lbs');
  });
});