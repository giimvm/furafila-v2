// Dados fictícios. Preços em centavos para evitar erros de ponto flutuante.
export const PRODUCTS = [
  // Lanches
  { id: 'x-burguer', categoryId: 'lanches', emoji: '🍔', name: 'X-Burguer CESAR', description: 'Pão brioche, hambúrguer de 120 g, queijo prato e molho da casa.', price: 1890, popular: true },
  { id: 'natural', categoryId: 'lanches', emoji: '🥪', name: 'Sanduíche Natural', description: 'Frango desfiado, cenoura ralada e alface no pão integral.', price: 1450 },
  { id: 'misto', categoryId: 'lanches', emoji: '🍞', name: 'Misto Quente', description: 'Presunto e mussarela na chapa, no pão de forma crocante.', price: 990, popular: true },
  { id: 'wrap', categoryId: 'lanches', emoji: '🌯', name: 'Wrap de Frango', description: 'Tortilla com frango grelhado, alface e molho de iogurte.', price: 1600 },

  // Salgados
  { id: 'coxinha', categoryId: 'salgados', emoji: '🍗', name: 'Coxinha Cremosa', description: 'Massa macia com recheio de frango e catupiry.', price: 750, popular: true },
  { id: 'pastel', categoryId: 'salgados', emoji: '🥟', name: 'Pastel de Queijo', description: 'Frito na hora, massa fina e bem crocante.', price: 800 },
  { id: 'empada', categoryId: 'salgados', emoji: '🥧', name: 'Empada de Frango', description: 'Massa amanteigada com recheio cremoso de frango.', price: 650 },
  { id: 'pao-de-queijo', categoryId: 'salgados', emoji: '🧀', name: 'Pão de Queijo (4 un.)', description: 'Quentinho, crocante por fora e macio por dentro.', price: 600, popular: true },
  { id: 'enroladinho', categoryId: 'salgados', emoji: '🌭', name: 'Enroladinho de Salsicha', description: 'Massa dourada com salsicha suculenta.', price: 600 },

  // Bebidas
  { id: 'suco-laranja', categoryId: 'bebidas', emoji: '🍊', name: 'Suco de Laranja', description: 'Natural, espremido na hora (300 ml).', price: 800, popular: true },
  { id: 'cafe', categoryId: 'bebidas', emoji: '☕', name: 'Café Coado', description: 'Cafezinho fresco, passado na hora.', price: 400 },
  { id: 'refrigerante', categoryId: 'bebidas', emoji: '🥤', name: 'Refrigerante Lata', description: 'Lata de 350 ml bem gelada. Cola, guaraná ou limão.', price: 650 },
  { id: 'agua', categoryId: 'bebidas', emoji: '💧', name: 'Água Mineral', description: 'Garrafa de 500 ml, com ou sem gás.', price: 350 },
  { id: 'cha-gelado', categoryId: 'bebidas', emoji: '🧋', name: 'Chá Gelado de Pêssego', description: 'Garrafa de 300 ml, levemente adocicado.', price: 600 },

  // Doces
  { id: 'brigadeiro', categoryId: 'doces', emoji: '🍫', name: 'Brigadeiro Gourmet', description: 'Chocolate belga com granulado crocante.', price: 400 },
  { id: 'bolo-cenoura', categoryId: 'doces', emoji: '🍰', name: 'Bolo de Cenoura', description: 'Fatia com cobertura generosa de chocolate.', price: 850, popular: true },
  { id: 'cookie', categoryId: 'doces', emoji: '🍪', name: 'Cookie com Gotas', description: 'Crocante por fora, macio por dentro.', price: 700 },
  { id: 'pudim', categoryId: 'doces', emoji: '🍮', name: 'Pudim de Leite', description: 'Fatia cremosa com calda de caramelo.', price: 900 },
];
