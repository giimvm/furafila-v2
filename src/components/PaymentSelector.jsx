import Icon from './ui/Icon.jsx';
import './Checkout.css';

// Renderiza qualquer lista de formas de pagamento recebida por props.
export default function PaymentSelector({ methods, selectedId, onChange }) {
  return (
    <fieldset className="payment">
      <legend className="field__label">Forma de pagamento</legend>
      <div className="payment__options">
        {methods.map(({ id, label, description, icon }) => {
          const selected = id === selectedId;
          return (
            <label key={id} className={`payment-option${selected ? ' payment-option--selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value={id}
                checked={selected}
                onChange={() => onChange(id)}
                className="visually-hidden"
              />
              <span className="payment-option__icon">
                <Icon name={icon} size={22} />
              </span>
              <span className="payment-option__text">
                <strong>{label}</strong>
                <small>{description}</small>
              </span>
              <span className="payment-option__check">{selected && <Icon name="check" size={16} strokeWidth={3} />}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
