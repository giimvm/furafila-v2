import { NAV_ITEMS } from '../config/navigation.js';
import { useCart } from '../context/CartContext.jsx';
import { isActivePath } from '../router/navigation.js';
import { usePath } from '../router/useRoute.js';
import Icon from './ui/Icon.jsx';
import Link from './ui/Link.jsx';
import './BottomNav.css';

// Barra inferior estilo app (só aparece em telas pequenas).
export default function BottomNav() {
  const path = usePath();
  const { totalItems } = useCart();

  return (
    <nav className="bottom-nav" aria-label="Navegação do app">
      {NAV_ITEMS.map((item) => {
        const active = isActivePath(path, item.to);
        return (
          <Link key={item.to} to={item.to} className={`bottom-nav__item${active ? ' bottom-nav__item--active' : ''}`}>
            <span className="bottom-nav__icon">
              <Icon name={item.icon} size={22} />
              {item.showsCartCount && totalItems > 0 && <span className="badge-count">{totalItems}</span>}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
