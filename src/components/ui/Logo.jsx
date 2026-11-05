import Icon from './Icon.jsx';
import './Logo.css';

export default function Logo({ size = 40 }) {
  return (
    <span className="logo" style={{ '--logo-size': `${size}px` }} aria-hidden="true">
      <Icon name="utensils" size={Math.round(size * 0.55)} strokeWidth={2.4} />
      <span className="logo__dot" />
    </span>
  );
}
