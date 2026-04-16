import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
export default function ProductCard({product}){
    return (
        <Link href={`/products/${product.slug}`}>
            <div className="border border-transparent duration-200 flex flex-col  outline-none p-6 rounded-[5px] shadow text-lg transition hover:border-orange-400 hover:ring-2 hover:ring-orange-100"
        >
                <div className="relative h-64 w-full self-center">
                    <Image src={`/products/${product.slug}`} alt={product.product_name} className="max-h-full object-contain" fill />
                </div>

                <div className="my-4 flex-grow">
                    <p className="font-bold text-xl leading-tight">{product.name}</p>
                    {(product.is_on_sale ==1)?(
                        <>
                            <p className="text-gray-500 line-through text-sm"><span
                                className="font-bold">{formatPrice(product.price)}</span> vnd</p>
                            <p className="text-red-600"><span className="font-bold text-xl">{formatPrice(product.sale_price)}</span>
                            vnd</p>  
                        </>
                    ):(
                        <>
                            <p className="text-red-600"><span className="font-bold text-xl">{formatPrice(product.price)}</span>
                            vnd</p>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}