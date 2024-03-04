import React, { useState } from 'react';

const groceryListContext = React.createContext({
  groceryList: [],
  setGroceryList: () => { }
});

export const GroceryListProvider = ({ children }) => {
  const [groceryList, setGroceryList] = useState([]);

  return (
    <groceryListContext.Provider value={{ groceryList, setGroceryList }}>
      {children}
    </groceryListContext.Provider>
  );
};

export const useGroceryList = () => React.useContext(groceryListContext);
