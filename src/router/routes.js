// Tabela de rotas: nova tela = nova linha (Aberto/Fechado).
import Home from '../components/Home.jsx';
import Menu from '../components/Menu.jsx';
import Cart from '../components/Cart.jsx';
import Checkout from '../components/Checkout.jsx';
import OrderTracking from '../components/OrderTracking.jsx';

export const routes = [
  { path: '/', component: Home },
  { path: '/cardapio', component: Menu },
  { path: '/carrinho', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/pedido', component: OrderTracking },
  { path: '/pedido/:id', component: OrderTracking },
];
