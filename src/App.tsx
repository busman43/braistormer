import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CheckoutPage } from './pages/CheckoutPage';
import { EnginePage } from './pages/EnginePage';
import { PricingPage } from './pages/PricingPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EnginePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
