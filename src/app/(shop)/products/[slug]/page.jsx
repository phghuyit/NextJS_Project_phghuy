import ProductDetail from "@/components/shop/product/ProductDetail";
import { products } from "@/data/products";

export default async function Page({params}) {
    const {slug}= await params;
    const item=products.find(e=>e.id==slug);
    if(!item) return <div>Không thấy sản phẩm có id {slug} </div>;
    return <ProductDetail product={item} />;
}
