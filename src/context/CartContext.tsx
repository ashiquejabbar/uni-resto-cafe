import React, { createContext, useContext, useState } from 'react';
import { Dish } from '../types/menu';

interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: string) => void;
  getItemQuantity: (dishId: string) => number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (dish: Dish) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.dish.dish_id === dish.dish_id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.dish.dish_id === dish.dish_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.dish.dish_id === dishId);
      
      if (existingItem?.quantity === 1) {
        return currentItems.filter(item => item.dish.dish_id !== dishId);
      }
      
      return currentItems.map(item =>
        item.dish.dish_id === dishId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const getItemQuantity = (dishId: string) => {
    return items.find(item => item.dish.dish_id === dishId)?.quantity || 0;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      getItemQuantity,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}