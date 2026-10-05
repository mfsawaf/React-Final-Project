import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getNewestProducts } from "../../Services/productService";
import ProductCard from "../product/ProductCard";

const NewestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getNewestProducts().then(setProducts);
  }, []);

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Newest Products</h2>
        <Link
          to="/shop"
          className="text-green-600 text-sm font-medium flex items-center gap-1"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewestProducts;


