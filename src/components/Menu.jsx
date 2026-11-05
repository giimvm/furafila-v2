import { useMemo, useState } from 'react';
import { CATEGORIES } from '../data/categories.js';
import { listProducts } from '../data/productRepository.js';
import { ALL_CATEGORIES_ID, filterProducts, groupByCategory } from '../services/menuService.js';
import CartBar from './CartBar.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import ProductGrid from './ProductGrid.jsx';
import SearchInput from './SearchInput.jsx';
import EmptyState from './ui/EmptyState.jsx';
import PageHeader from './ui/PageHeader.jsx';
import './Menu.css';

const FILTER_OPTIONS = [{ id: ALL_CATEGORIES_ID, label: 'Todos', emoji: '✨' }, ...CATEGORIES];

export default function Menu() {
  const [categoryId, setCategoryId] = useState(ALL_CATEGORIES_ID);
  const [query, setQuery] = useState('');

  const sections = useMemo(
    () => groupByCategory(filterProducts(listProducts(), { categoryId, query }), CATEGORIES),
    [categoryId, query],
  );

  const clearFilters = () => {
    setCategoryId(ALL_CATEGORIES_ID);
    setQuery('');
  };

  return (
    <div className="container page menu">
      <PageHeader title="Cardápio" subtitle="Escolha, adicione ao carrinho e retire sem fila." />

      <div className="menu__toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar coxinha, suco, bolo…" />
        <CategoryFilter categories={FILTER_OPTIONS} selectedId={categoryId} onSelect={setCategoryId} />
      </div>

      {sections.length === 0 ? (
        <EmptyState emoji="🔎" title="Nada encontrado" text="Tente outro nome ou volte a mostrar todas as categorias.">
          <button type="button" className="btn btn--ghost" onClick={clearFilters}>
            Limpar filtros
          </button>
        </EmptyState>
      ) : (
        sections.map((section) => (
          <section key={section.id} className="menu__section">
            <h2 className="section-title">
              <span aria-hidden="true">{section.emoji}</span> {section.label}
            </h2>
            <ProductGrid products={section.products} />
          </section>
        ))
      )}

      <CartBar />
    </div>
  );
}
