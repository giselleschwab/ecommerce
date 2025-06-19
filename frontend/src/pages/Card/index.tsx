import { useState } from 'react';
import { ShoppingCart, Trash } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';
import ToastAlert from '../../components/ToastAlert';

export default function Cart() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const { query } = useSearch();

  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0);

  const filteredCart = cart.filter((item: any) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const removeItem = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    showToast('Product removed from cart', 'success');
  };
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const finalizeOrder = async () => {
    await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, total }),
    });

    showToast('Order placed successfully!', 'success');
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-[#4b8795] flex items-center gap-2 mb-4">
          <ShoppingCart /> Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-12 text-base sm:text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-3 max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#4b8795]/40 scrollbar-track-gray-100 pr-1">
              {filteredCart.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex justify-between items-start sm:items-center p-3 rounded-lg bg-gray-50 flex-col sm:flex-row gap-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700">{item.name}</p>
                    <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)}</p>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="text-[#4b8795] hover:text-[#4b8795]/40 transition cursor-pointer"
                    title="Remove"
                  >
                    <Trash size={18} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-700">
              <span>
                <strong>{cart.length}</strong> item{cart.length > 1 ? 's' : ''}
              </span>
              <span className="text-base font-bold text-[#ea8c76]">Total: R$ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={finalizeOrder}
              className="w-full mt-4 bg-[#4b8795] hover:bg-[#4b8795]/90 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              Place Order
            </button>
          </>
        )}
      </div>

      {toast && (
        <ToastAlert message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
