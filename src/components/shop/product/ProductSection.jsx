import ProductCard from "./ProductCard";

export default function ProductSection({title,des,products}){
    return(
      <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{des}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id ?? product.slug ?? index}
            index={index}
            product={product}
          />
        ))}
      </div>
    </section>
    );
}