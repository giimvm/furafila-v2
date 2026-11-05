import { createContext, useContext } from 'react';
import { useCartState } from '../hooks/useCartState.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cart = useCartState();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart deve ser usado dentro de <CartProvider>');
  return cart;
}
