import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Cart from './pages/Card';
import Orders from './pages/Orders';
import Header from './components/Header';
import { SearchProvider } from './contexts/SearchContext';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  return (
    <SearchProvider>
      <Router>
        <Header cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home setCartCount={setCartCount} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}
