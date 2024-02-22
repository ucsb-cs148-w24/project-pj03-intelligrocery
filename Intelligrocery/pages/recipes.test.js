import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import AddIngredient from './addIngredient';

import App from '../App';

jest.useFakeTimers();
describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
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