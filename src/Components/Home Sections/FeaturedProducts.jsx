import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../../Services/productService";
import ProductCard from "../Product/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
