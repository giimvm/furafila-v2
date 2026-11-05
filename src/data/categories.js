// Novas categorias entram aqui (Aberto/Fechado): Menu, filtros e cards se adaptam sozinhos.
export const CATEGORIES = [
  { id: 'lanches', label: 'Lanches', emoji: '🍔', tint: '#FFE3C7' },
  { id: 'salgados', label: 'Salgados', emoji: '🥟', tint: '#FFF0C2' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤', tint: '#D9EEFF' },
  { id: 'doces', label: 'Doces', emoji: '🍰', tint: '#FFDDE6' },
];

export function findCategory(id) {
  return CATEGORIES.find((category) => category.id === id) ?? null;
}
