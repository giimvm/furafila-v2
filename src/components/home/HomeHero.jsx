import { firstName } from '../../utils/format.js';
import Icon from '../ui/Icon.jsx';
import Link from '../ui/Link.jsx';

// Anel de 15 minutos: um quarto da hora destacado, como um relógio.
function IntervalRing() {
  return (
    <div className="interval-ring" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="112" height="112">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="#fff"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray="69.1 207.3"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="interval-ring__label">
        <strong>15</strong>
        <span>min</span>
      </div>
    </div>
  );
}

export default function HomeHero({ studentName }) {
  const name = firstName(studentName) || 'aluno';

  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Olá, {name}! 👋</p>
        <h1 className="hero__title">Peça agora e retire sem enfrentar fila.</h1>
        <p className="hero__text">
          Escolha seu lanche no cardápio, confirme o pedido e acompanhe o preparo em tempo real.
        </p>
        <div className="hero__actions">
          <Link to="/cardapio" className="btn btn--light">
            Fazer pedido <Icon name="arrow-right" size={18} strokeWidth={2.6} />
          </Link>
        </div>
      </div>

      <div className="hero__interval">
        <IntervalRing />
        <div>
          <p className="hero__interval-title">Intervalo de 15 minutos</p>
          <p className="hero__interval-text">Cada minuto conta. Peça antes e aproveite o recreio de verdade.</p>
        </div>
      </div>
    </section>
  );
}
