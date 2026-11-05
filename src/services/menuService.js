// Filtro e agrupamento do cardápio (puro, sem React).
export const ALL_CATEGORIES_ID = 'all';

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export function filterProducts(products, { categoryId = ALL_CATEGORIES_ID, query = '' } = {}) {
  const term = normalize(query.trim());
  return products.filter((product) => {
    const matchesCategory = categoryId === ALL_CATEGORIES_ID || product.categoryId === categoryId;
    const matchesQuery = !term || normalize(`${product.name} ${product.description}`).includes(term);
    return matchesCategory && matchesQuery;
  });
}

// Devolve seções já "achatadas": { id, label, emoji, products } — só as que têm itens.
export function groupByCategory(products, categories) {
  return categories
    .map(({ id, label, emoji }) => ({
      id,
      label,
      emoji,
      products: products.filter((product) => product.categoryId === id),
    }))
    .filter((section) => section.products.length > 0);
}
