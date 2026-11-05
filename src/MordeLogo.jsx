import { useEffect, useMemo, useState } from 'react';
import { useCart } from './context/CartContext.jsx';
import { useOrders } from './context/OrdersContext.jsx';
import { listProducts } from './data/productRepository.js';
import { navigate } from './router/navigation.js';
import { appStorage } from './services/storage.js';
import './MordeLogo.css';

/**
 * ÚNICA classe nova da v2: o mascote MordeLogo.
 * Compõe (não herda) o que já existe: recebe o catálogo e o storage por construtor
 * (Inversão de Dependências) e mantém suas regras privadas (#) — Ocultamento de Informação.
 */
export class MordeLogo {
  static REASONS = ['Pedido atrasado', 'Pedido não entregue', 'Pedido chegou frio', 'Pedido incorreto', 'Outro problema'];
  static STEPS = [
    { title: 'Oi, eu sou o MordeLogo!', text: 'Vou te mostrar o FuraFila em 4 passinhos.' },
    { title: 'Veja os produtos', text: 'Abra o Cardápio e filtre por categoria ou busque pelo nome.' },
    { title: 'Monte o carrinho', text: 'Toque em adicionar nos itens que quiser e ajuste as quantidades.' },
    { title: 'Finalize o pedido', text: 'No carrinho, confirme o pedido e acompanhe até a retirada.' },
    { title: 'Fale comigo', text: 'Toque no meu botão laranja quando não souber o que pedir.' },
  ];
  // Perguntas são dados: nova pergunta = novo item (Aberto/Fechado).
  static QUESTIONS = [
    { id: 'tipo', text: 'Você quer algo doce, salgado ou para beber?', options: [
      { label: 'Salgado', accepts: (p) => ['lanches', 'salgados'].includes(p.categoryId) },
      { label: 'Doce', accepts: (p) => p.categoryId === 'doces' },
      { label: 'Bebida', accepts: (p) => p.categoryId === 'bebidas' } ] },
    { id: 'fome', text: 'Quer matar a fome ou só um acompanhamento?', options: [
      { label: 'Matar a fome', accepts: (p) => p.price >= 800 },
      { label: 'Só um acompanhamento', accepts: (p) => p.price < 800 } ] },
  ];

  #catalog; #storage;
  #key = { tutorial: 'furafila:tutorial-visto', theme: 'furafila:tema', reports: 'furafila:relatos' };

  constructor({ catalog = { list: listProducts }, storage = appStorage } = {}) {
    this.#catalog = catalog;
    this.#storage = storage;
  }

  get theme() { return this.#storage.read(this.#key.theme, 'light'); }
  setTheme(theme) {
    this.#storage.write(this.#key.theme, theme);
    document.documentElement.dataset.theme = theme;
  }
  get firstRun() { return !this.#storage.read(this.#key.tutorial, false); }
  finishTutorial() { this.#storage.write(this.#key.tutorial, true); }

  recommend(answers) {
    const picked = answers.map((a, i) => MordeLogo.QUESTIONS[i].options[a].accepts);
    const fits = this.#catalog.list().filter((p) => picked.every((accepts) => accepts(p)));
    return fits.sort((a, b) => Number(!!b.popular) - Number(!!a.popular)).slice(0, 3);
  }

  report(orderId, reason, note = '') {
    const record = { orderId, reason, note, at: new Date().toISOString() };
    this.#storage.write(this.#key.reports, [record, ...this.#storage.read(this.#key.reports, [])]);
    return record;
  }
}

function Face({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="40" y="26" width="16" height="24" rx="6" fill="#c24a00" />
      <path d="M32 4C22 18 8 28 8 42a24 20 0 0 0 48 0C56 28 42 18 32 4Z" fill="#ffb347" stroke="#e85d04" strokeWidth="3" />
      <circle cx="24" cy="38" r="6" fill="#fff" /><circle cx="40" cy="38" r="6" fill="#fff" />
      <circle cx="25" cy="39" r="3" fill="#2a1a0f" /><circle cx="41" cy="39" r="3" fill="#2a1a0f" />
      <path d="M26 49q6 5 12 0" stroke="#2a1a0f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Visão fina: só desenha; toda regra mora na classe MordeLogo.
export function MordeLogoWidget() {
  const mascot = useMemo(() => new MordeLogo(), []);
  const cart = useCart();
  const { orders } = useOrders();
  const [theme, setTheme] = useState(mascot.theme);
  const [step, setStep] = useState(mascot.firstRun ? 0 : null);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('assistente');
  const [answers, setAnswers] = useState([]);
  const [reason, setReason] = useState(MordeLogo.REASONS[0]);
  const [orderId, setOrderId] = useState('');
  const [done, setDone] = useState(null);

  useEffect(() => { mascot.setTheme(theme); }, [mascot, theme]);

  const q = MordeLogo.QUESTIONS[answers.length];
  const picks = q ? [] : mascot.recommend(answers);
  const closeTutorial = () => { mascot.finishTutorial(); setStep(null); };
  const send = () => setDone(mascot.report(orderId || orders[0]?.id || 'sem-pedido', reason));

  if (step !== null) {
    const s = MordeLogo.STEPS[step];
    return (
      <div className="ml-overlay" role="dialog" aria-label="Tutorial">
        <div className="ml-card"><Face size={72} /><h2>{s.title}</h2><p>{s.text}</p>
          <div className="ml-row">
            <button className="btn btn--ghost" onClick={closeTutorial}>Pular</button>
            <button className="btn btn--primary" onClick={() => (step + 1 < MordeLogo.STEPS.length ? setStep(step + 1) : closeTutorial())}>
              {step + 1 < MordeLogo.STEPS.length ? 'Próximo' : 'Começar'}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button className="ml-fab" onClick={() => setOpen(!open)} aria-label="Falar com o MordeLogo"><Face /></button>
      {open && (
        <section className="ml-panel card" aria-label="MordeLogo">
          <div className="ml-tabs">
            {[['assistente', 'Pedir'], ['tema', 'Tema'], ['problema', 'Problema']].map(([id, label]) => (
              <button key={id} className={`ml-tab${tab === id ? ' ml-tab--on' : ''}`} onClick={() => setTab(id)}>{label}</button>))}
          </div>
          {tab === 'assistente' && (q ? (<>
            <p><strong>{q.text}</strong></p>
            {q.options.map((o, i) => <button key={o.label} className="btn btn--outline btn--block" onClick={() => setAnswers([...answers, i])}>{o.label}</button>)}
          </>) : (<>
            <p><strong>Separei isto pra você:</strong></p>
            {picks.length === 0 && <p>Nada com esse perfil. Tente de novo!</p>}
            {picks.map((p) => (<div className="ml-row" key={p.id}><span>{p.name}</span>
              <button className="btn btn--primary btn--sm" onClick={() => cart.add(p.id)}>Adicionar</button></div>))}
            <button className="btn btn--ghost btn--block" onClick={() => setAnswers([])}>Recomeçar</button>
            <button className="btn btn--ghost btn--block" onClick={() => { setOpen(false); navigate('/carrinho'); }}>Ver carrinho</button>
          </>))}
          {tab === 'tema' && ['light', 'dark'].map((t) => (
            <button key={t} className={`btn btn--block ${theme === t ? 'btn--primary' : 'btn--outline'}`} onClick={() => setTheme(t)}>
              {t === 'light' ? 'Tema claro' : 'Tema escuro'}</button>))}
          {tab === 'problema' && (done ? (<p>✅ Relato registrado para o pedido <strong>{done.orderId}</strong>: {done.reason}. Obrigado!</p>) : (<>
            <select value={orderId} onChange={(e) => setOrderId(e.target.value)}>
              {orders.length === 0 && <option value="">Nenhum pedido</option>}
              {orders.map((o) => <option key={o.id} value={o.id}>{o.id}</option>)}</select>
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {MordeLogo.REASONS.map((r) => <option key={r}>{r}</option>)}</select>
            <button className="btn btn--primary btn--block" disabled={orders.length === 0} onClick={send}>Enviar relato</button>
          </>))}
        </section>
      )}
    </>
  );
}
