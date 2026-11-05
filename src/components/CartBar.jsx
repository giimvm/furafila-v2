import { useCart } from '../context/CartContext.jsx';
import { formatCurrency, pluralize } from '../utils/format.js';
import Icon from './ui/Icon.jsx';
import Link from './ui/Link.jsx';
import './Menu.css';

// Barra flutuante "Ver carrinho" mostrada no cardápio quando há itens.
export default function CartBar() {
  const { totalItems, total } = useCart();
  if (totalItems === 0) return null;

  return (
    <Link to="/carrinho" className="cart-bar">
      <span className="cart-bar__left">
        <Icon name="cart" size={20} />
        {totalItems} {pluralize(totalItems, 'item', 'itens')}
      </span>
      <span className="cart-bar__cta">
        Ver carrinho · {formatCurrency(total)} <Icon name="arrow-right" size={18} strokeWidth={2.6} />
      </span>
    </Link>
  );
}
