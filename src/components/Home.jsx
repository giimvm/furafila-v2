import { useOrders } from '../context/OrdersContext.jsx';
import { useStudentName } from '../hooks/useStudentName.js';
import CurrentOrderBanner from './home/CurrentOrderBanner.jsx';
import HomeHero from './home/HomeHero.jsx';
import HowItWorks from './home/HowItWorks.jsx';
import PopularProducts from './home/PopularProducts.jsx';
import './Home.css';

// Tela de composição: cada bloco tem sua própria responsabilidade.
export default function Home() {
  const { currentOrder } = useOrders();
  const [studentName] = useStudentName();

  return (
    <div className="container page home">
      <HomeHero studentName={studentName} />
      {currentOrder && <CurrentOrderBanner order={currentOrder} />}
      <PopularProducts />
      <HowItWorks />
    </div>
  );
}
