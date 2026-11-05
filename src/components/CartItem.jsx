import { formatCurrency } from '../utils/format.js';
import Icon from './ui/Icon.jsx';
import QuantityStepper from './ui/QuantityStepper.jsx';
import './Cart.css';

export default function CartItem({ line, onIncrease, onDecrease, onRemove }) {
  return (
    <li className="cart-item card">
      <span className="cart-item__emoji" aria-hidden="true">
        {line.emoji}
      </span>

      <div className="cart-item__info">
        <h3 className="cart-item__name">{line.name}</h3>
        <p className="cart-item__unit">{formatCurrency(line.price)} cada</p>
        <div className="cart-item__controls">
          <QuantityStepper quantity={line.quantity} itemName={line.name} onIncrease={onIncrease} onDecrease={onDecrease} />
        </div>
      </div>

      <div className="cart-item__side">
        <strong className="cart-item__total">{formatCurrency(line.lineTotal)}</strong>
        <button type="button" className="icon-btn" onClick={onRemove} aria-label={`Remover ${line.name} do carrinho`}>
          <Icon name="trash" size={18} />
        </button>
      </div>
    </li>
  );
}
