import React, { createContext, useCallback, useState, useContext } from 'react';

export interface CartItem {
  idProduct: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextData {
  items: CartItem[];
  total: number;
  addItem(item: CartItem): void;
  removeItem(idProduct: string): void;
  updateQuantity(idProduct: string, quantity: number): void;
  clearCart(): void;
  itemCount: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('@IHunger:cart');
    return stored ? JSON.parse(stored) : [];
  });

  const saveCart = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('@IHunger:cart', JSON.stringify(newItems));
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      const existing = items.find(i => i.idProduct === item.idProduct);
      let newItems: CartItem[];

      if (existing) {
        newItems = items.map(i =>
          i.idProduct === item.idProduct
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      } else {
        newItems = [...items, item];
      }

      saveCart(newItems);
    },
    [items, saveCart],
  );

  const removeItem = useCallback(
    (idProduct: string) => {
      const newItems = items.filter(i => i.idProduct !== idProduct);
      saveCart(newItems);
    },
    [items, saveCart],
  );

  const updateQuantity = useCallback(
    (idProduct: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(idProduct);
        return;
      }

      const newItems = items.map(i =>
        i.idProduct === idProduct ? { ...i, quantity } : i,
      );
      saveCart(newItems);
    },
    [items, saveCart, removeItem],
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context;
}

export { CartProvider, useCart };
