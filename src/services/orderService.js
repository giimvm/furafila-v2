// Regras de criação e andamento dos pedidos (funções puras).
import { ORDER_STATUSES } from '../data/orderStatuses.js';
import { calculateSubtotal, calculateTotal } from './pricing.js';

const FIRST_ORDER_NUMBER = 101;

export function nextOrderNumber(orders) {
  const highest = orders.reduce((max, order) => Math.max(max, Number(order.id.replace(/\D/g, ''))), FIRST_ORDER_NUMBER - 1);
  return `CC-${String(highest + 1).padStart(3, '0')}`;
}

export function createOrder({ customerName, lines, paymentMethodId, existingOrders, now = new Date() }) {
  const timestamp = now.toISOString();
  return {
    id: nextOrderNumber(existingOrders),
    customerName: customerName.trim(),
    items: lines.map(({ productId, name, emoji, price, quantity }) => ({ productId, name, emoji, price, quantity })),
    total: calculateTotal(calculateSubtotal(lines)),
    paymentMethodId,
    status: ORDER_STATUSES[0].id,
    archived: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function getStatusIndex(statusId) {
  return ORDER_STATUSES.findIndex((status) => status.id === statusId);
}

export function getStatus(statusId) {
  return ORDER_STATUSES[getStatusIndex(statusId)] ?? ORDER_STATUSES[0];
}

export function isFinalStatus(statusId) {
  return getStatusIndex(statusId) >= ORDER_STATUSES.length - 1;
}

export function advanceOrder(order, now = new Date()) {
  if (isFinalStatus(order.status)) return order;
  const next = ORDER_STATUSES[getStatusIndex(order.status) + 1];
  return { ...order, status: next.id, updatedAt: now.toISOString() };
}

export function archiveOrder(order) {
  return { ...order, archived: true };
}

// Pedidos ficam ordenados do mais novo para o mais antigo.
export function pickCurrentOrder(orders) {
  return orders.find((order) => !order.archived) ?? null;
}
