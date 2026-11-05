import { useCallback, useMemo } from 'react';
import { STORAGE_KEYS } from '../config/storageKeys.js';
import { findProductById } from '../data/productRepository.js';
import { appStorage } from '../services/storage.js';
import { addItem, buildLines, changeQuantity, countUnits, quantityOf, removeItem } from '../services/cartService.js';
import { calculateSubtotal, calculateTotal } from '../services/pricing.js';
import { usePersistentState } from './usePersistentState.js';

// Interface pública do carrinho. Quem consome não sabe como o estado é guardado.
export function useCartState({ storage = appStorage, findProduct = findProductById } = {}) {
  const [items, setItems] = usePersistentState(STORAGE_KEYS.cart, [], storage);

  const lines = useMemo(() => buildLines(items, findProduct), [items, findProduct]);
  const subtotal = calculateSubtotal(lines);

  const add = useCallback((productId) => setItems((current) => addItem(current, productId)), [setItems]);
  const increase = useCallback((productId) => setItems((current) => changeQuantity(current, productId, +1)), [setItems]);
  const decrease = useCallback((productId) => setItems((current) => changeQuantity(current, productId, -1)), [setItems]);
  const remove = useCallback((productId) => setItems((current) => removeItem(current, productId)), [setItems]);
  const clear = useCallback(() => setItems([]), [setItems]);

  return {
    lines,
    subtotal,
    total: calculateTotal(subtotal),
    totalItems: countUnits(items),
    isEmpty: items.length === 0,
    quantityOf: (productId) => quantityOf(items, productId),
    add,
    increase,
    decrease,
    remove,
    clear,
  };
}
