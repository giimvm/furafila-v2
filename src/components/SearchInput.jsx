import Icon from './ui/Icon.jsx';
import './Menu.css';

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <label className="search">
      <Icon name="search" size={20} />
      <span className="visually-hidden">Buscar no cardápio</span>
      <input
        type="search"
        className="search__input"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
