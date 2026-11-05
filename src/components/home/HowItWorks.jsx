const STEPS = [
  { emoji: '🍔', title: 'Escolha', text: 'Monte seu pedido pelo cardápio.' },
  { emoji: '📲', title: 'Confirme', text: 'Informe seu nome e a forma de pagamento.' },
  { emoji: '🛍️', title: 'Retire', text: 'Quando estiver pronto, é só pegar no balcão.' },
];

export default function HowItWorks() {
  return (
    <section className="home-section">
      <h2 className="section-title">Como funciona</h2>
      <ol className="how">
        {STEPS.map((step, index) => (
          <li key={step.title} className="how__step card">
            <span className="how__number">{index + 1}</span>
            <span className="how__emoji" aria-hidden="true">
              {step.emoji}
            </span>
            <div>
              <h3 className="how__title">{step.title}</h3>
              <p className="how__text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
