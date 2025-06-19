import { Link } from 'react-router-dom';
import { ShoppingCart, Home as HomeIcon, ShoppingBag } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';

type HeaderProps = {
    cartCount: number;
};

export default function Header({ cartCount }: HeaderProps) {
    const { query, setQuery } = useSearch();

    return (
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 p-4 bg-white shadow-md border-b border-gray-200">
            <Link
                to="/"
                className="text-2xl font-bold text-[#4b8795] tracking-wide hover:opacity-80 transition"
            >
                Devnology Store
            </Link>

            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full md:w-1/2 px-2 py-1 border-b-2 border-gray-200 focus:border-[#4b8795] focus:outline-none transition duration-200"
            />

            <div className="flex gap-6 items-center md:justify-end justify-center w-full md:w-auto">
                <Link to="/" title="Home">
                    <HomeIcon className="cursor-pointer text-[#4b8795] hover:text-[#3a6e7b] transition" />
                </Link>

                <Link to="/orders" title="Orders">
                    <ShoppingBag className="cursor-pointer text-[#4b8795] hover:text-[#3a6e7b] transition" />
                </Link>

                <Link to="/cart" title="Cart" className="relative">
                    <ShoppingCart className="cursor-pointer text-[#4b8795] hover:text-[#3a6e7b] transition" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-[#ea8c76] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}
