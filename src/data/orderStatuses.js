// A ordem do array define o fluxo do pedido. Um novo estado = uma nova linha.
export const ORDER_STATUSES = [
  { id: 'received', label: 'Pedido recebido', hint: 'Já está na fila da cozinha.', emoji: '🧾', icon: 'receipt', tone: 'info' },
  { id: 'preparing', label: 'Em preparação', hint: 'Nossa equipe está preparando tudo com carinho.', emoji: '👩‍🍳', icon: 'chef', tone: 'warning' },
  { id: 'ready', label: 'Pronto para retirada', hint: 'É só ir ao balcão e mostrar o número do pedido.', emoji: '🛍️', icon: 'bag', tone: 'success' },
];
