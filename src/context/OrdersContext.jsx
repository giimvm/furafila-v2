import { createContext, useContext } from 'react';
import { useOrdersState } from '../hooks/useOrdersState.js';

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const orders = useOrdersState();
  return <OrdersContext.Provider value={orders}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const orders = useContext(OrdersContext);
  if (!orders) throw new Error('useOrders deve ser usado dentro de <OrdersProvider>');
  return orders;
}
