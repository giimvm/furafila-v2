import { formatCurrency } from '../../utils/format.js';
import Link from '../ui/Link.jsx';
import StatusBadge from '../ui/StatusBadge.jsx';

export default function OrderHistory({ orders, selectedId }) {
  return (
    <section className="home-section">
      <h2 className="section-title">Meus pedidos</h2>
      <ul className="history">
        {orders.map((order) => (
          <li key={order.id}>
            <Link to={`/pedido/${order.id}`} className={`history__item card${order.id === selectedId ? ' history__item--selected' : ''}`}>
              <strong>{order.id}</strong>
              <StatusBadge statusId={order.status} />
              <span className="history__total">{formatCurrency(order.total)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
