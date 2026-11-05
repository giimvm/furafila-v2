import { NAV_ITEMS } from '../config/navigation.js';
import { useCart } from '../context/CartContext.jsx';
import { isActivePath } from '../router/navigation.js';
import { usePath } from '../router/useRoute.js';
import Icon from './ui/Icon.jsx';
import Link from './ui/Link.jsx';
import Logo from './ui/Logo.jsx';
import './Header.css';

const pageLinks = NAV_ITEMS.filter((item) => !item.showsCartCount);

export default function Header() {
  const path = usePath();
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand" aria-label="Cantina CESAR — início">
          <Logo />
          <span className="brand__name">
            Cantina <strong>CESAR</strong>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Principal">
          {pageLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`header__link${isActivePath(path, item.to) ? ' header__link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <span className="header__pill">
          <Icon name="clock" size={16} /> 15 min
        </span>

        <Link to="/carrinho" className="header__cart" aria-label={`Carrinho, ${totalItems} itens`}>
          <Icon name="cart" size={20} />
          Carrinho
          {totalItems > 0 && <span className="badge-count">{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
}
