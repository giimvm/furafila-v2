import { useState } from 'react';
import { useOrders } from '../context/OrdersContext.jsx';
import { useAutoAdvance } from '../hooks/useAutoAdvance.js';
import { navigate } from '../router/navigation.js';
import { isFinalStatus } from '../services/orderService.js';
import DemoControls from './tracking/DemoControls.jsx';
import OrderHistory from './tracking/OrderHistory.jsx';
import OrderItemsList from './tracking/OrderItemsList.jsx';
import OrderProgress from './tracking/OrderProgress.jsx';
import StatusHero from './tracking/StatusHero.jsx';
import EmptyState from './ui/EmptyState.jsx';
import Icon from './ui/Icon.jsx';
import Link from './ui/Link.jsx';
import PageHeader from './ui/PageHeader.jsx';
import './OrderTracking.css';

export default function OrderTracking({ params }) {
  const { orders, currentOrder, findById, advance, archive } = useOrders();
  const [autoRunning, setAutoRunning] = useState(false);

  const order = params.id ? findById(params.id) : (currentOrder ?? orders[0] ?? null);
  const isFinal = order ? isFinalStatus(order.status) : true;

  useAutoAdvance({
    enabled: autoRunning && !isFinal,
    onTick: () => order && advance(order.id),
  });

  if (!order) {
    return (
      <div className="container page">
        <PageHeader title="Acompanhar pedido" />
        <EmptyState
          emoji="🧾"
          title={params.id ? 'Pedido não encontrado' : 'Você ainda não fez um pedido'}
          text="Faça um pedido e acompanhe o preparo por aqui."
        >
          <Link to="/cardapio" className="btn btn--primary">
            Fazer pedido <Icon name="arrow-right" size={18} strokeWidth={2.6} />
          </Link>
        </EmptyState>
      </div>
    );
  }

  const handlePickedUp = () => {
    archive(order.id);
    navigate('/');
  };

  return (
    <div className="container page tracking">
      <PageHeader title="Acompanhar pedido" subtitle="Atualizamos o status assim que a cozinha avançar." />

      <div className="tracking-layout">
        <div className="tracking-main">
          <section className="card ticket">
            <div className="ticket__number">
              <span className="ticket__label">Número do pedido</span>
              <strong className="ticket__code">{order.id}</strong>
              <span className="ticket__hint">Mostre este número no balcão</span>
            </div>
            <div className="ticket__divider" aria-hidden="true" />
            <div className="ticket__status">
              <StatusHero statusId={order.status} />
            </div>
          </section>

          <section className="card tracking-progress">
            <OrderProgress statusId={order.status} />
          </section>

          {isFinal && (
            <section className="pickup card">
              <p className="pickup__text">
                🎉 Seu pedido está pronto! Retire no balcão da cantina.
              </p>
              {!order.archived && (
                <button type="button" className="btn btn--primary" onClick={handlePickedUp}>
                  <Icon name="check" size={18} strokeWidth={2.8} /> Já retirei meu pedido
                </button>
              )}
            </section>
          )}

          <DemoControls
            isFinal={isFinal}
            autoRunning={autoRunning && !isFinal}
            onAdvance={() => advance(order.id)}
            onToggleAuto={() => setAutoRunning((running) => !running)}
          />
        </div>

        <div className="tracking-side">
          <OrderItemsList order={order} />
          <Link to="/cardapio" className="btn btn--ghost btn--block">
            Fazer novo pedido
          </Link>
        </div>
      </div>

      {orders.length > 1 && <OrderHistory orders={orders} selectedId={order.id} />}
    </div>
  );
}
