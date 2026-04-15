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

                <div className="mb-12 mt-6">
                    <p className="font-semibold">{product.product_name}</p>
                    <p className="">{product.slug}</p>
                    <p className="text-red-400"><span className="font-semibold">{formatPrice(product.price)} </span></p>
                </div>
            </div>
        </Link>
    );
}