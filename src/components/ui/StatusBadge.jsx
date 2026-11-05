import { getStatus } from '../../services/orderService.js';
import './StatusBadge.css';

export default function StatusBadge({ statusId }) {
  const { label, tone } = getStatus(statusId);
  return (
    <span className={`status-badge status-badge--${tone}`}>
      <span className="status-badge__dot" />
      {label}
    </span>
  );
}
