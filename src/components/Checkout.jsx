import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import { PAYMENT_METHODS } from '../data/paymentMethods.js';
import { useStudentName } from '../hooks/useStudentName.js';
import { navigate } from '../router/navigation.js';
import { formatCurrency } from '../utils/format.js';
import PaymentSelector from './PaymentSelector.jsx';
import EmptyState from './ui/EmptyState.jsx';
import Icon from './ui/Icon.jsx';
import Link from './ui/Link.jsx';
import PageHeader from './ui/PageHeader.jsx';
import PriceBreakdown from './ui/PriceBreakdown.jsx';
import './Checkout.css';

export default function Checkout() {
  const { lines, subtotal, total, isEmpty, clear } = useCart();
  const { place } = useOrders();
  const [studentName, setStudentName] = useStudentName();
  const [paymentId, setPaymentId] = useState(PAYMENT_METHODS[0].id);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return null; // pedido feito: a navegação para o acompanhamento está em curso

  if (isEmpty) {
    return (
      <div className="container page">
        <PageHeader title="Finalizar pedido" />
        <EmptyState emoji="🛒" title="Não há itens para finalizar" text="Adicione produtos ao carrinho primeiro.">
          <Link to="/cardapio" className="btn btn--primary">
            Ir ao cardápio
          </Link>
        </EmptyState>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (studentName.trim().length < 2) {
      setError('Informe seu nome para identificarmos o pedido.');
      return;
    }

    const order = place({ customerName: studentName, lines, paymentMethodId: paymentId });
    setSubmitted(true);
    clear();
    navigate(`/pedido/${order.id}`);
  };

  return (
    <div className="container page">
      <PageHeader title="Finalizar pedido" subtitle="Falta pouco para garantir seu lanche.">
        <Link to="/carrinho" className="text-btn">
          <Icon name="arrow-left" size={16} /> Voltar ao carrinho
        </Link>
      </PageHeader>

      <form className="checkout-layout" onSubmit={handleSubmit} noValidate>
        <div className="checkout-main">
          <section className="card checkout-card">
            <label className="field">
              <span className="field__label">Seu nome</span>
              <span className={`field__control${error ? ' field__control--error' : ''}`}>
                <Icon name="user" size={20} />
                <input
                  className="field__input"
                  type="text"
                  value={studentName}
                  placeholder="Ex.: Maria Silva"
                  autoComplete="name"
                  onChange={(event) => {
                    setStudentName(event.target.value);
                    setError('');
                  }}
                />
              </span>
              {error && (
                <span className="field__error" role="alert">
                  {error}
                </span>
              )}
            </label>
          </section>

          <section className="card checkout-card">
            <PaymentSelector methods={PAYMENT_METHODS} selectedId={paymentId} onChange={setPaymentId} />
          </section>
        </div>

        <aside className="card summary">
          <h2 className="summary__title">Resumo do pedido</h2>
          <ul className="summary__items">
            {lines.map((line) => (
              <li key={line.productId} className="summary__item">
                <span aria-hidden="true">{line.emoji}</span>
                <span className="summary__item-name">
                  {line.quantity}× {line.name}
                </span>
                <span>{formatCurrency(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <PriceBreakdown subtotal={subtotal} total={total} />
          <button type="submit" className="btn btn--primary btn--block">
            <Icon name="check" size={18} strokeWidth={2.8} /> Confirmar pedido
          </button>
          <p className="summary__hint">Nenhum pagamento real é processado nesta demonstração.</p>
        </aside>
      </form>
    </div>
  );
}
