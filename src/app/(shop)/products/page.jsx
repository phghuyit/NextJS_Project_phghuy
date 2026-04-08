import ProductCard from "@/components/shop/product/ProductCard";
import ProductList from "@/components/shop/product/ProductList";
import { product } from "@/data/product";
import { products } from "@/data/products";
export default function Page() {
  return (
    <>
    <div className="mb-3"><ProductCard index={product.id} product={product}/></div>
    <div className="grid grid-cols-2 gap-3 m-12">
      <ProductList products={products}/>
    </div>
    </>
  );
}
