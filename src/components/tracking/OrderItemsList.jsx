import { findPaymentMethod } from '../../data/paymentMethods.js';
import { formatCurrency, formatTime } from '../../utils/format.js';

export default function OrderItemsList({ order }) {
  const paymentLabel = findPaymentMethod(order.paymentMethodId)?.label ?? '—';

  return (
    <section className="card order-items">
      <h2 className="summary__title">Itens do pedido</h2>
      <ul className="summary__items">
        {order.items.map((item) => (
          <li key={item.productId} className="summary__item">
            <span aria-hidden="true">{item.emoji}</span>
            <span className="summary__item-name">
              {item.quantity}× {item.name}
            </span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <dl className="order-items__meta">
        <div>
          <dt>Aluno</dt>
          <dd>{order.customerName}</dd>
        </div>
        <div>
          <dt>Pagamento</dt>
          <dd>{paymentLabel}</dd>
        </div>
        <div>
          <dt>Feito às</dt>
          <dd>{formatTime(order.createdAt)}</dd>
        </div>
        <div className="order-items__total">
          <dt>Total</dt>
          <dd>{formatCurrency(order.total)}</dd>
        </div>
      </dl>
    </section>
  );
}
