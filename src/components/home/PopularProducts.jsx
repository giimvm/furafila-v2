import { listPopularProducts } from '../../data/productRepository.js';
import Icon from '../ui/Icon.jsx';
import Link from '../ui/Link.jsx';
import ProductGrid from '../ProductGrid.jsx';

export default function PopularProducts() {
  return (
    <section className="home-section">
      <div className="section-head">
        <h2 className="section-title">🔥 Mais pedidos</h2>
        <Link to="/cardapio" className="section-link">
          Ver cardápio completo <Icon name="arrow-right" size={16} />
        </Link>
      </div>
      <ProductGrid products={listPopularProducts()} />
    </section>
  );
}
