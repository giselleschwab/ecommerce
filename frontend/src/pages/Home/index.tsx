import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { useSearch } from '../../contexts/SearchContext';
import ToastAlert from '../../components/ToastAlert';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  provider: string;
};

type Props = {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function Home({ setCartCount }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const { query } = useSearch();

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.length);
    showToast('Product added to cart!', 'success');
  };


  const filteredProducts = products.filter((product) => {
    const matchesProvider = (() => {
      if (!filter) return true;

      const provider = product.provider.toLowerCase();
      const selected = filter.toLowerCase();

      if (selected === 'brazilian') {
        return provider === 'brazilian' || provider === 'european';
      }

      return provider === selected;
    })();

    const matchesSearch = (() => {
      if (!query) return true;

      const search = query.toLowerCase();
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.provider.toLowerCase().includes(search)
      );
    })();

    return matchesProvider && matchesSearch;
  });


  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <>
      <div className="flex justify-center gap-2 px-6 mt-4">
        {['All', 'Brazilian', 'European'].map((label) => (
          <span
            key={label}
            onClick={() => setFilter(label === 'All' ? null : label)}
            className={`w-24 text-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors 
            ${filter === (label === 'All' ? null : label)
                ? 'bg-[#4b8795] text-white'
                : 'bg-[#e0eff1] text-[#4b8795] hover:bg-[#d0e3e6]'}`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto justify-items-center">

        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
      </div>

      {!loading && visibleCount < filteredProducts.length && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleLoadMore}
            className="bg-[#4b8795] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#3c6e79] transition cursor-pointer"
          >
            Load more
          </button>
        </div>
      )}

      {toast && (
        <ToastAlert message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
}
