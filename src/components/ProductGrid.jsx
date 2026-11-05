import { useCart } from '../context/CartContext.jsx';
import { findCategory } from '../data/categories.js';
import ProductCard from './ProductCard.jsx';
import './ProductCard.css';

// Liga os cards ao carrinho. Usado na Home (populares) e no Cardápio.
export default function ProductGrid({ products }) {
  const { quantityOf, add, increase, decrease } = useCart();

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          tint={findCategory(product.categoryId)?.tint}
          quantity={quantityOf(product.id)}
          onAdd={() => add(product.id)}
          onIncrease={() => increase(product.id)}
          onDecrease={() => decrease(product.id)}
        />
      ))}
    </div>
  );
}
