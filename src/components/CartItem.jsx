import Image from "next/image";
import { formatPrice } from '@/utils/formatPrice';
export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    // Extracting basic info. Defaulting quantity to 1 if not provided.
    const { id, product_name, image, price, quantity = 1 } = item;

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 bg-white rounded-lg shadow-sm mb-4 gap-4">
            {/* Product Image and Name */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                    <Image
                        src={image || '/placeholder-image.png'}
                        alt={product_name}
                        className="w-full h-full object-cover"
                        fill
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product_name}</h3>
                    <p className="text-gray-500 font-medium mt-1">
                        {formatPrice(price)}
                    </p>
                </div>
            </div>

            {/* Quantity Controls & Subtotal */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                        onClick={() => onUpdateQuantity(id, quantity - 1)}
                        disabled={quantity <= 1}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                    >
                        -
                    </button>
                    <span className="px-3 py-1 text-gray-800 font-medium border-x border-gray-300 min-w-[2.5rem] text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(id, quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        +
                    </button>
                </div>

                <div className="text-right min-w-[100px]">
                    <p className="text-lg font-bold text-blue-600">{formatPrice(price * quantity)}</p>
                </div>

                <button
                    onClick={() => onRemove(id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 bg-red-50 hover:bg-red-100 rounded-full"
                    aria-label="Remove item"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}