import { resetDemoData } from '../services/demoService.js';
import Logo from './ui/Logo.jsx';
import './Footer.css';

export default function Footer() {
  const handleReset = () => {
    if (window.confirm('Apagar o carrinho e os pedidos desta demonstração?')) resetDemoData();
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size={28} />
          <span>
            <strong>Cantina CESAR</strong> · Prova de conceito · CESAR School
          </span>
        </div>
        <div className="footer__actions">
          <span className="footer__note">Produtos e preços fictícios.</span>
          <button type="button" className="footer__reset" onClick={handleReset}>
            Reiniciar demonstração
          </button>
        </div>
      </div>
    </footer>
  );
}
