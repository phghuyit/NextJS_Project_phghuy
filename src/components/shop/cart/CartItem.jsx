import Image from "next/image";
import  formatPrice  from '@/utils/formatPrice';
import { product } from "@/data/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function CartItem({ item, onUpdateQuantity, onRemove }) {
const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const { id, product_name, image, price,sale_price, qty = 1,is_on_sale=0 } = item;
const currentPrice = is_on_sale == 1 ? sale_price : price;
console.log(item)
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 bg-white rounded-lg shadow-sm mb-4 gap-4">
          
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                    <Image
                        src={image?`${STORAGE_URL}${image}`:"/no-image/jpg"}
                        alt={product_name}
                        className="w-full h-full object-cover"
                        fill
                        unoptimized
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product_name}</h3>
                    <p className="text-gray-500 font-medium mt-1">
                        {formatPrice(currentPrice)}
                    </p>
                </div>
            </div>

           
            <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                        onClick={() => onUpdateQuantity(id, Number(qty) - 1)}
                        disabled={qty <= 1}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                        -
                    </button>
                    <span className="px-3 py-1 text-gray-800 font-medium border-x border-gray-300 min-w-[2.5rem] text-center">
                        {qty}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(id, Number(qty) + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        +
                    </button>
                </div>

                <div className="text-right min-w-[100px]">
                    <p className="text-lg font-bold text-blue-600">{formatPrice(currentPrice * qty)}</p>
                </div>

                <button
                    onClick={() => onRemove(id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 bg-red-50 hover:bg-red-100 rounded-full"
                    aria-label="Remove item"
                >
                   <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}