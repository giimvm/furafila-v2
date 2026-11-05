import { formatCurrency } from '../utils/format.js';
import Icon from './ui/Icon.jsx';
import QuantityStepper from './ui/QuantityStepper.jsx';
import './ProductCard.css';

// Apresentacional: não conhece o carrinho, só recebe dados e callbacks (Acoplamento baixo).
export default function ProductCard({ product, tint, quantity, onAdd, onIncrease, onDecrease }) {
  return (
    <article className="product-card card">
      <div className="product-card__art" style={{ '--tint': tint }}>
        <span className="product-card__emoji" role="img" aria-label={product.name}>
          {product.emoji}
        </span>
        {product.popular && (
          <span className="product-card__tag">
            <Icon name="flame" size={13} /> Popular
          </span>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc" title={product.description}>
          {product.description}
        </p>

        <div className="product-card__footer">
          <span className="product-card__price">{formatCurrency(product.price)}</span>
          {quantity > 0 ? (
            <QuantityStepper
              block
              quantity={quantity}
              itemName={product.name}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ) : (
            <button type="button" className="btn btn--primary btn--sm btn--block" onClick={onAdd}>
              <Icon name="plus" size={16} strokeWidth={2.6} />
              Adicionar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
