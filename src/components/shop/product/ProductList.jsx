import ProductCard from "./ProductCard";
export default function ProductList({products}){
    return(
        <>
            {
                products.map(product=>(
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </>
    );
}