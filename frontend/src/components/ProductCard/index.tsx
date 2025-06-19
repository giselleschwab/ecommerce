import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import fallbackImage from '../../assets/img_notavaiable.png';

type Props = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number | null;
    image: string;
    provider: string;
  };
  onAddToCart: (product: any) => void;
};

export function ProductCard({ product, onAddToCart }: Props) {
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden text-sm w-full max-w-xs sm:max-w-none">

      <div className="relative h-36 sm:h-40 md:h-44 bg-[#EFEEEC]">
        <img
          src={imgSrc}
          onError={() => setImgSrc(fallbackImage)}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center cursor-pointer">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-white text-[#4b8795] border border-[#4b8795] font-semibold py-2 px-4 rounded-md shadow transition cursor-pointer hover:bg-[#4b8795] hover:text-white flex items-center gap-2 text-sm"
        >
          <ShoppingCart size={18} />
          Add to cart
        </button>
      </div>

      <div className="p-2 sm:p-3 flex flex-col justify-between gap-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
          <span className="inline-block bg-blue-100 text-blue-700 text-[10px] font-medium px-2 py-0.5 rounded-full mt-1">
            {product.provider}
          </span>
        </div>

        <div className="mt-1 sm:mt-2 flex flex-col gap-2">
          <p className="text-sm sm:text-base font-bold text-[#ea8c76]">
            {typeof product.price === 'number' ? `R$ ${product.price.toFixed(2)}` : 'Preço indisponível'}
          </p>

          <button
            onClick={() => onAddToCart(product)}
            className="md:hidden bg-[#4b8795] text-white font-semibold py-2 px-4 rounded-md shadow transition hover:bg-[#3a6e7b] flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart size={16} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
