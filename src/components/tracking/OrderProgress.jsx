import { ORDER_STATUSES } from '../../data/orderStatuses.js';
import { getStatusIndex, isFinalStatus } from '../../services/orderService.js';
import Icon from '../ui/Icon.jsx';

// Linha do tempo do pedido. Funciona com qualquer quantidade de estados.
export default function OrderProgress({ statusId }) {
  const current = getStatusIndex(statusId);
  const total = ORDER_STATUSES.length;
  const ratio = current / (total - 1);

  return (
    <ol
      className={`progress${isFinalStatus(statusId) ? ' progress--complete' : ''}`}
      style={{ '--count': total, '--ratio': ratio }}
      aria-label="Andamento do pedido"
    >
      <span className="progress__track" aria-hidden="true">
        <span className="progress__fill" />
      </span>

      {ORDER_STATUSES.map((status, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'todo';
        return (
          <li key={status.id} className={`progress__step progress__step--${state}`} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="progress__dot">
              <Icon name={state === 'done' ? 'check' : status.icon} size={22} strokeWidth={state === 'done' ? 3 : 2} />
            </span>
            <span className="progress__label">{status.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
