import './Menu.css';

// Recebe as categorias por props: adicionar categoria não exige mexer aqui.
export default function CategoryFilter({ categories, selectedId, onSelect }) {
  return (
    <div className="chips" role="tablist" aria-label="Categorias">
      {categories.map(({ id, label, emoji }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={id === selectedId}
          className={`chip${id === selectedId ? ' chip--active' : ''}`}
          onClick={() => onSelect(id)}
        >
          {emoji && <span aria-hidden="true">{emoji}</span>}
          {label}
        </button>
      ))}
    </div>
  );
}
