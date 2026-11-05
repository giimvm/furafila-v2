import { PICKUP_FEE } from '../../services/pricing.js';
import { formatCurrency } from '../../utils/format.js';
import './PriceBreakdown.css';

export default function PriceBreakdown({ subtotal, total }) {
  return (
    <dl className="price-breakdown">
      <div className="price-breakdown__row">
        <dt>Subtotal</dt>
        <dd>{formatCurrency(subtotal)}</dd>
      </div>
      <div className="price-breakdown__row">
        <dt>Retirada no balcão</dt>
        <dd className={PICKUP_FEE === 0 ? 'price-breakdown__free' : undefined}>
          {PICKUP_FEE === 0 ? 'Grátis' : formatCurrency(PICKUP_FEE)}
        </dd>
      </div>
      <div className="price-breakdown__row price-breakdown__row--total">
        <dt>Total</dt>
        <dd>{formatCurrency(total)}</dd>
      </div>
    </dl>
  );
}
