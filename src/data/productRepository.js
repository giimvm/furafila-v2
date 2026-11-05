// Ocultamento de informação: o restante do app não conhece o array PRODUCTS.
// Se os dados vierem de uma API no futuro, só este arquivo muda.
import { PRODUCTS } from './products.js';

const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));

export function listProducts() {
  return PRODUCTS;
}

export function listPopularProducts() {
  return PRODUCTS.filter((product) => product.popular);
}

export function findProductById(id) {
  return productsById.get(id) ?? null;
}
