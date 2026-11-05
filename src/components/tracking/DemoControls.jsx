import Icon from '../ui/Icon.jsx';

// Painel só para a apresentação: simula o que a equipe da cantina faria no balcão.
export default function DemoControls({ isFinal, autoRunning, onAdvance, onToggleAuto }) {
  return (
    <section className="demo" aria-label="Modo demonstração">
      <div className="demo__head">
        <span className="demo__tag">Modo demonstração</span>
        <p className="demo__text">Simula a cozinha da cantina atualizando o status do pedido.</p>
      </div>
      <div className="demo__actions">
        <button type="button" className="btn btn--primary btn--sm" onClick={onAdvance} disabled={isFinal}>
          <Icon name="bolt" size={16} /> Avançar status
        </button>
        <button type="button" className="btn btn--outline btn--sm" onClick={onToggleAuto} disabled={isFinal}>
          <Icon name={autoRunning ? 'pause' : 'play'} size={16} />
          {autoRunning ? 'Parar simulação' : 'Simular automaticamente'}
        </button>
      </div>
    </section>
  );
}
