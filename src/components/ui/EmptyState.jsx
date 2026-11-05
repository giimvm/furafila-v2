import './EmptyState.css';

export default function EmptyState({ emoji, title, text, children }) {
  return (
    <div className="empty-state card">
      <span className="empty-state__emoji" aria-hidden="true">
        {emoji}
      </span>
      <h2 className="empty-state__title">{title}</h2>
      {text && <p className="empty-state__text">{text}</p>}
      {children}
    </div>
  );
}
