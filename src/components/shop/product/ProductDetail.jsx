import { addToCart } from "@/lib/features/cart/cartSlice";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import { useDispatch } from "react-redux";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
export default function ProductDetail({product}){
    const dispatch = useDispatch();

    const handleAdd = ()=>{
        dispatch(addToCart(product));
    }

    return(
        <section className="m-12 rounded-[5px] border border-gray-200 bg-white p-6 shadow">
            <div className="grid gap-8 md:grid-cols-[45%_1fr]">
                <div className="flex min-h-80 items-center justify-center rounded-[5px] border border-gray-100 bg-gray-50 p-6">
                    <Image
                        src="https://placehold.co/300"
                        alt={product.product_name}
                        width={300}
                        height={300}
                        className="max-h-96 max-w-full object-contain"
                        unoptimized
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-500">
                        {product.category}
                    </p>

                    <h1 className="text-3xl font-bold text-[#131921]">
                        {product.product_name}
                    </h1>

                    <p className="mt-4 text-2xl font-semibold text-red-400">
                        {product.is_on_sale === 1 ? (
                            <>
                                <span className="line-through opacity-70 mr-2 text-black text-[16px]">
                                    {formatPrice(product.price)}
                                </span>
                                {formatPrice(product.sale_price)}
                            </>
                        ) : (
                            formatPrice(product.price)
                        )}
                    </p>
                    <p className="mt-6 text-gray-600">
                        {product.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button onClick={handleAdd} className="rounded-[5px] bg-orange-400 px-6 py-3 font-semibold text-[#131921] transition duration-300 hover:bg-orange-500">
                            Add to cart
                        </button>

                        <button className="rounded-[5px] border border-[#131921] px-6 py-3 font-semibold text-[#131921] transition duration-300 hover:bg-[#131921] hover:text-white">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
