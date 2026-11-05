import Icon from './Icon.jsx';
import './QuantityStepper.css';

// Componente puramente visual: recebe valores e callbacks, não conhece o carrinho.
export default function QuantityStepper({ quantity, onIncrease, onDecrease, itemName, block = false }) {
  const willRemove = quantity <= 1;

  return (
    <div className={`stepper${block ? ' stepper--block' : ''}`}>
      <button
        type="button"
        className="stepper__btn"
        onClick={onDecrease}
        aria-label={`${willRemove ? 'Remover' : 'Diminuir'} ${itemName}`}
      >
        <Icon name={willRemove ? 'trash' : 'minus'} size={16} />
      </button>
      <span className="stepper__value" aria-live="polite">
        {quantity}
      </span>
      <button type="button" className="stepper__btn" onClick={onIncrease} aria-label={`Aumentar ${itemName}`}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
