// Nova forma de pagamento? Adicione um item aqui; o Checkout renderiza automaticamente.
export const PAYMENT_METHODS = [
  { id: 'pix', label: 'PIX', description: 'Pague pelo app do seu banco ao retirar', icon: 'pix' },
  { id: 'cash', label: 'Dinheiro', description: 'Pague no balcão ao retirar', icon: 'cash' },
];

export function findPaymentMethod(id) {
  return PAYMENT_METHODS.find((method) => method.id === id) ?? null;
}
