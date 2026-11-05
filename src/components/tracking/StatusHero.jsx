import { getStatus } from '../../services/orderService.js';

export default function StatusHero({ statusId }) {
  const { emoji, label, hint, tone } = getStatus(statusId);

  return (
    <div className={`status-hero status-hero--${tone}`} aria-live="polite">
      <span className="status-hero__emoji" aria-hidden="true">
        {emoji}
      </span>
      <div>
        <h2 className="status-hero__label">{label}</h2>
        <p className="status-hero__hint">{hint}</p>
      </div>
    </div>
  );
}
