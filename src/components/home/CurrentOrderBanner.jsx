import { ORDER_STATUSES } from '../../data/orderStatuses.js';
import { getStatus, getStatusIndex } from '../../services/orderService.js';
import { formatCurrency, pluralize } from '../../utils/format.js';
import Icon from '../ui/Icon.jsx';
import Link from '../ui/Link.jsx';
import StatusBadge from '../ui/StatusBadge.jsx';

export default function CurrentOrderBanner({ order }) {
  const reached = getStatusIndex(order.status);
  const unitCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="order-banner card" aria-label="Pedido em andamento">
      <div className="order-banner__emoji" aria-hidden="true">
        {getStatus(order.status).emoji}
      </div>

      <div className="order-banner__info">
        <p className="order-banner__eyebrow">Seu pedido atual</p>
        <h2 className="order-banner__title">
          {order.id} <StatusBadge statusId={order.status} />
        </h2>
        <p className="order-banner__meta">
          {unitCount} {pluralize(unitCount, 'item', 'itens')} · {formatCurrency(order.total)}
        </p>
        <div className="mini-progress" aria-hidden="true">
          {ORDER_STATUSES.map((status, index) => (
            <span key={status.id} className={`mini-progress__seg${index <= reached ? ' mini-progress__seg--on' : ''}`} />
          ))}
        </div>
      </div>

      <Link to={`/pedido/${order.id}`} className="btn btn--primary order-banner__cta">
        Acompanhar <Icon name="arrow-right" size={18} strokeWidth={2.6} />
      </Link>
    </section>
  );
}
