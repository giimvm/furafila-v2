import { useEffect } from 'react';
import BottomNav from './components/BottomNav.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import { MordeLogoWidget } from './MordeLogo.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { OrdersProvider } from './context/OrdersContext.jsx';
import { routes } from './router/routes.js';
import { useRoute } from './router/useRoute.js';

// Raiz de composição: monta providers, layout e escolhe a página pela rota.
export default function App() {
  const { path, Page, params } = useRoute(routes);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <CartProvider>
      <OrdersProvider>
        <div className="app">
          <Header />
          <main className="app__main">
            <Page params={params} />
          </main>
          <Footer />
          <BottomNav />
          <MordeLogoWidget />
        </div>
      </OrdersProvider>
    </CartProvider>
  );
}
