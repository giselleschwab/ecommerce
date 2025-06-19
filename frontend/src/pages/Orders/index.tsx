import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const { query } = useSearch();

    const filteredOrders = orders.filter((order) =>
        order.items.some((item: any) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        )
    );
    useEffect(() => {
        fetch('http://localhost:3000/orders')
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="px-4 py-8 md:py-12">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold text-[#4b8795] flex items-center gap-2 mb-4">
                    <ShoppingBag /> Order History
                </h2>

                {loading ? (
                    <p className="text-gray-500 text-center py-12 text-base sm:text-lg">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500 text-center py-12 text-base sm:text-lg">No orders found.</p>
                ) : (
                    <ul className="space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#4b8795]/40 scrollbar-track-gray-100 pr-1">
                        {filteredOrders.map((order) => (
                            <li key={order.id} className="p-4 bg-gray-50 rounded-xl shadow-sm">
                                <div className="mb-2 text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Order #{order.id}</span> –{' '}
                                    {new Date(order.createdAt).toLocaleString()}
                                </div>
                                <ul className="space-y-2">
                                    {order.items.map((item: any, index: number) => (
                                        <li key={index} className="flex justify-between text-sm text-gray-700">
                                            <span>{item.name}</span>
                                            <span>R$ {item.price.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-2 font-bold text-right text-[#ea8c76]">
                                    Total: R$ {order.total.toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
