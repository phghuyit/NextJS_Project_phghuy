import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import getImageSrc from "@/utils/getImageSrc";


export default function ProductCard({product}){
    const discountPercentage = product.price > 0 ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;
    return (
        <Link href={`/products/${product.slug}`} className="block h-full">
            <div className="border border-transparent duration-200 flex flex-col h-full outline-none p-6 rounded-[5px] shadow text-lg transition hover:border-orange-400 hover:ring-2 hover:ring-orange-100"
        >
                <div className="relative h-64 w-full self-center">
                    <Image src={getImageSrc(product.image)} alt={product.product_name} className="max-h-full object-contain" fill unoptimized/>
                </div>


                <div className="my-4 grow flex flex-col">
                    <p className="font-bold text-xl leading-tight">{product.product_name}</p>
                    <p className="text-sm text-gray-500 mt-1 mb-2">{product.brand.name}</p>
                    <div className="mt-auto">
                        {(product.is_on_sale ==1)?(
                            <>
                                <div className="flex items-center gap-2">
                                    <p className="text-red-600"><span className="font-bold text-xl">{formatPrice(product.sale_price)}</span> vnd</p>
                                    <span className="bg-red-500 text-white text-xs text-center font-bold px-1.5 p-0.5 rounded">
                                        -{discountPercentage}%
                                    </span>
                                </div>
                                <p className="text-gray-500 line-through text-sm"><span className="font-bold">{formatPrice(product.price)}</span> vnd</p>
                            </>
                        ):(
                            <>
                                <p className="text-red-600"><span className="font-bold text-xl">{formatPrice(product.price)}</span> vnd</p>
                                <p className="text-gray-500 line-through text-sm invisible"><span className="font-bold">{formatPrice(product.price)}</span> vnd</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

