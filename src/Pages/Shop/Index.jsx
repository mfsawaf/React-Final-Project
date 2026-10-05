import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductsByCategory,
} from "../../Services/productService";
import ProductCard from "../../Components/Product/ProductCard";
import Container from "../../Components/Common/Container";
import Button from "../../Components/Common/Button";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (activeCategory === "all") {
      getAllProducts().then(setProducts);
    } else {
      getProductsByCategory(activeCategory).then(setProducts);
    }
  }, [activeCategory]);

  return (
    <Container>
      <div className="py-10">
        {/* Banner */}
        <div className="bg-black rounded-xl mb-8 relative overflow-hidden text-white h-50 flex items-center px-8">
          <img
            src="/sale of the month.jpg"
            alt="Vegetables"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-wide">Best Deals</p>
            <h2 className="text-3xl font-bold mt-2">Sale of the Month</h2>
          </div>

          <div className="absolute top-6 right-8 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold z-10">
            50% off
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-3 mb-8 cursor-pointer">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory("vegetables")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              activeCategory === "vegetables"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Vegetables
          </button>
          <button
            onClick={() => setActiveCategory("fruits")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              activeCategory === "fruits"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Fruits
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Shop;
