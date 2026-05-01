import { addToCart } from "@/lib/features/cart/cartSlice";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import categoryServices from "@/services/categoryService";
import { getBrandNameByID } from "@/services/brandServices";
import getImageSrc from "@/utils/getImageSrc";
export default function ProductDetail({product}){
    const dispatch = useDispatch();
    const [cat, setCat] = useState("");
    const [brand, setBrand] = useState("");

    useEffect(() => {
        async function fetchDetails() {
            if (product?.cat_id) {
                try {
                    const catRes = await categoryServices.getCatById(product.cat_id);
                    setCat(catRes.category_name || catRes.data?.category_name || "");
                } catch (error) {
                    console.error("Lỗi tải dữ liệu danh mục: " + error);
                }
            }
            console.log("tac gia",product)
            if (product?.brand_id) {
                try {
                    const brandRes = await getBrandNameByID(product.brand_id);

                    console.log("tac gia",brandRes)
                    setBrand(brandRes.data ? brandRes.data.name : brandRes.name || "");
                } catch (error) {
                    console.error("Lỗi tải dữ liệu tác giả/thương hiệu: " + error);
                }
            }
        }
        fetchDetails();
    }, [product]);

    const handleAdd = ()=>{
        dispatch(addToCart(product));
    }
    
    return(
        <section className="m-12 rounded-[5px] border border-gray-200 bg-white p-6 shadow">
            <div className="grid gap-8 md:grid-cols-[45%_1fr]">
                <div className="flex min-h-80 items-center justify-center rounded-[5px] border border-gray-100 bg-gray-50 p-6">
                    <Image
                        src={getImageSrc(product.image)}
                        alt={product.product_name}
                        width={300}
                        height={300}
                        className="max-h-96 max-w-full object-contain"
                        unoptimized
                    />
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-col space-y-4 rounded-2xl border border-[#d3d3d3] bg-white p-5 shadow-sm">
                        <div className="space-y-2">
                            <p className="text-2xl font-bold capitalize leading-tight">
                                {product.product_name}
                                {product?.created_at && (
                                    <span className="ml-2 text-xs font-normal text-[#616b69]">
                                        {new Date(product.created_at).toLocaleDateString("vi-VN")}
                                    </span>
                                )}
                            </p>
                            <p className="text-sm text-[#565959]">
                                <span className="capitalize">Tác giả: </span>
                                <a href="#" className="font-medium text-[#3671a7] hover:text-black hover:underline">
                                    {brand || 'Chưa xác định tác giả'}
                                </a>
                            </p>
                            <div className="flex flex-wrap gap-2 text-sm">
                                <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[#374151]">
                                    {cat || 'Chưa xác định thể loại'}
                                </span>
                                <span className="rounded-full bg-[#fff4e5] px-3 py-1 text-[#b45309]">
                                    Còn {product?.qty || 0} cuốn
                                </span>
                            </div>

                            <p className="mt-4 text-2xl font-semibold text-red-500">
                                {product?.is_on_sale === 1 ? (
                                    <>
                                        <span className="line-through opacity-70 mr-2 text-black text-[16px]">
                                            {formatPrice(product.price)}
                                        </span>
                                        {formatPrice(product.sale_price)} vnd
                                    </>
                                ) : (
                                    <>{formatPrice(product?.price || 0)} vnd</>
                                )}
                            </p>
                        </div>

                        <div className="flex-1 border-t border-[#d3d3d3] pt-4 leading-7 text-[#222]">
                            <details className="group">
                                <summary className="w-fit cursor-pointer items-center list-none text-sm font-medium text-blue-500 transition-colors hover:text-orange-500">
                                    <div className="mt-3 text-base font-normal text-[#333] line-clamp-3 group-open:line-clamp-none">
                                        {product?.description || 'Chưa có mô tả'}
                                    </div>
                                    <span className="group-open:hidden inline-flex items-center mt-2">
                                        Xem thêm
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-3 w-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </span>
                                    <span className="hidden group-open:inline-flex items-center mt-2">
                                        Thu gọn
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-3 w-3 transition-transform duration-300 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </span>
                                </summary>
                            </details>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button onClick={handleAdd} className="rounded-[5px] bg-orange-400 px-6 py-3 font-semibold text-[#131921] transition duration-300 hover:bg-orange-500">
                            Thêm vào giỏ
                        </button>

                        <button className="rounded-[5px] border border-[#131921] px-6 py-3 font-semibold text-[#131921] transition duration-300 hover:bg-[#131921] hover:text-white">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
