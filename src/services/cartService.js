// Funções puras do carrinho: recebem o estado e devolvem um novo estado.
// O carrinho guarda só { productId, quantity }; nome e preço vêm do catálogo
// (buildLines), então o preço nunca fica desatualizado no localStorage.

export const MAX_PER_ITEM = 10;

export function addItem(items, productId) {
  return changeQuantity(items.some((i) => i.productId === productId) ? items : [...items, { productId, quantity: 0 }], productId, +1);
}

export function changeQuantity(items, productId, delta) {
  return items
    .map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(MAX_PER_ITEM, item.quantity + delta) }
        : item,
    )
    .filter((item) => item.quantity > 0);
}

export function removeItem(items, productId) {
  return items.filter((item) => item.productId !== productId);
}

export function quantityOf(items, productId) {
  return items.find((item) => item.productId === productId)?.quantity ?? 0;
}

export function countUnits(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

// Linhas "achatadas" (Lei de Demeter): a UI lê line.name, não line.product.name.
export function buildLines(items, findProduct) {
  return items.flatMap(({ productId, quantity }) => {
    const product = findProduct(productId);
    if (!product) return []; // produto removido do catálogo: ignora
    return [
      {
        productId,
        name: product.name,
        emoji: product.emoji,
        price: product.price,
        quantity,
        lineTotal: product.price * quantity,
      },
    ];
  });
}
