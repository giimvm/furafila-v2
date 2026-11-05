import { useCart } from '../context/CartContext.jsx';
import CartItem from './CartItem.jsx';
import EmptyState from './ui/EmptyState.jsx';
import Icon from './ui/Icon.jsx';
import Link from './ui/Link.jsx';
import PageHeader from './ui/PageHeader.jsx';
import PriceBreakdown from './ui/PriceBreakdown.jsx';
import './Cart.css';

export default function Cart() {
  const { lines, subtotal, total, isEmpty, increase, decrease, remove, clear } = useCart();

  if (isEmpty) {
    return (
      <div className="container page">
        <PageHeader title="Seu carrinho" />
        <EmptyState emoji="🛒" title="Seu carrinho está vazio" text="Que tal escolher algo gostoso no cardápio?">
          <Link to="/cardapio" className="btn btn--primary">
            Ver cardápio <Icon name="arrow-right" size={18} strokeWidth={2.6} />
          </Link>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="container page">
      <PageHeader title="Seu carrinho" subtitle="Confira os itens antes de finalizar.">
        <button type="button" className="text-btn" onClick={clear}>
          Limpar carrinho
        </button>
      </PageHeader>

      <div className="cart-layout">
        <ul className="cart-list">
          {lines.map((line) => (
            <CartItem
              key={line.productId}
              line={line}
              onIncrease={() => increase(line.productId)}
              onDecrease={() => decrease(line.productId)}
              onRemove={() => remove(line.productId)}
            />
          ))}
        </ul>

        <aside className="summary card">
          <h2 className="summary__title">Resumo</h2>
          <PriceBreakdown subtotal={subtotal} total={total} />
          <Link to="/checkout" className="btn btn--primary btn--block">
            Finalizar pedido <Icon name="arrow-right" size={18} strokeWidth={2.6} />
          </Link>
          <Link to="/cardapio" className="summary__more">
            + Adicionar mais itens
          </Link>
        </aside>
      </div>
    </div>
  );
}
