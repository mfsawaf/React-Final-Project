import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductsByCategory,
} from "../../Services/productService";
import ProductCard from "../../Components/Product/ProductCard";
import Container from "../../Components/Common/Container";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      let data;
      if (activeCategory === "all") {
        data = await getAllProducts();
      } else {
        data = await getProductsByCategory(activeCategory);
      }

      if (sortOrder === "lowToHigh") {
        data = [...data].sort((a, b) => a.price - b.price);
      } else if (sortOrder === "highToLow") {
        data = [...data].sort((a, b) => b.price - a.price);
      }

      setProducts(data);
    };

    fetchProducts();
  }, [activeCategory, sortOrder]);

  return (
    <Container>
      <div className="py-10">
        {/* Banner */}
        <div className="bg-black rounded-xl mb-8 relative overflow-hidden text-white h-[200px] flex items-center px-8">
          <img
            src="/SaleOfTheMonth.jpg"
            alt="Vegetables"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-wide">Best Deals</p>
            <h2 className="text-3xl font-bold mt-2">Sale of the Month</h2>
          </div>

          <div className="absolute top-6 right-8 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold z-10">
            50%
          </div>
        </div>

        {/* Filter + Sort Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
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

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer"
          >
            <option value="default">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
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
