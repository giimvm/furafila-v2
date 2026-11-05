import { useCallback, useRef } from 'react';
import { STORAGE_KEYS } from '../config/storageKeys.js';
import { appStorage } from '../services/storage.js';
import { advanceOrder, archiveOrder, createOrder, pickCurrentOrder } from '../services/orderService.js';
import { usePersistentState } from './usePersistentState.js';

export function useOrdersState({ storage = appStorage } = {}) {
  const [orders, setOrders] = usePersistentState(STORAGE_KEYS.orders, [], storage);

  // Guarda a lista mais recente para devolver o pedido criado de forma síncrona.
  const latestOrders = useRef(orders);
  latestOrders.current = orders;

  const place = useCallback(
    ({ customerName, lines, paymentMethodId }) => {
      const order = createOrder({ customerName, lines, paymentMethodId, existingOrders: latestOrders.current });
      latestOrders.current = [order, ...latestOrders.current];
      setOrders(latestOrders.current);
      return order;
    },
    [setOrders],
  );

  const updateOrder = useCallback(
    (orderId, change) => setOrders((current) => current.map((order) => (order.id === orderId ? change(order) : order))),
    [setOrders],
  );

  const advance = useCallback((orderId) => updateOrder(orderId, advanceOrder), [updateOrder]);
  const archive = useCallback((orderId) => updateOrder(orderId, archiveOrder), [updateOrder]);
  const findById = useCallback((orderId) => orders.find((order) => order.id === orderId) ?? null, [orders]);

  return {
    orders,
    currentOrder: pickCurrentOrder(orders),
    place,
    advance,
    archive,
    findById,
  };
}
