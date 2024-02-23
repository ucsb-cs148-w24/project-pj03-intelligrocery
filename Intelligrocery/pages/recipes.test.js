import React from 'react';
import AddIngredient from './addIngredient';
import { render, fireEvent } from '@testing-library/react-native';
import PantryItem from './pantryItem'; // Adjust the import path as necessary

jest.useFakeTimers();

jest.mock('../firebase.js', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn().mockImplementation((callback) => {
      // Simulate a user being signed in or out
      const user = { /* Mock user object */ };
      callback(user);
      return jest.fn(); 
    }),
  }),
}));

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
    const { getByText } = render(<PantryItem item={mockItem} handleDelete={mockHandleDelete} />);
    expect(getByText('Tomatoes - 2 lbs')).toBeTruthy();
  });

  it('applies checked styles if the item is checked', () => {
    const checkedItem = { ...mockItem, checked: true };
    const { getByText } = render(<PantryItem item={checkedItem} handleDelete={mockHandleDelete} />);
    expect(getByText('Tomatoes - 2 lbs').props.style).toHaveProperty('textDecorationLine', 'line-through');
  });
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