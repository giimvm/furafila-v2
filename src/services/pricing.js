// Regras de preço em um único lugar. Valores em centavos.
export const PICKUP_FEE = 0; // retirada no balcão é grátis

export function calculateSubtotal(lines) {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}

export function calculateTotal(subtotal) {
  return subtotal + PICKUP_FEE;
}
