import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Heart, Share2, Minus, Plus } from "lucide-react";
import { getProductById } from "../../Services/productService";
import Container from "../../Components/Common/Container";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center text-gray-500">Loading...</div>
      </Container>
    );
  }

  const { name, description, price, stock, rating, images, category } = product;

  // ✅ تعديل: إرسال المنتج كاملاً
  const inWishlist = isInWishlist(product);

  const imageUrl = images?.[0]?.url
    ? `http://localhost:1337${images[0].url}`
    : "/placeholder.png";

  const tabs = [
    { key: "description", label: "Description" },
    { key: "additional", label: "Additional Information" },
  ];

  return (
    <Container>
      <div className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
            <img
              src={imageUrl}
              alt={name}
              className="max-h-96 object-contain"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{name}</h1>

            <div className="flex text-yellow-400 text-sm mt-2">
              {"★".repeat(Math.round(rating || 0))}
              {"☆".repeat(5 - Math.round(rating || 0))}
            </div>

            <p className="text-2xl font-semibold text-green-600 mt-4">
              ${price}
            </p>

            <p className="text-gray-500 text-sm mt-4">
              {description?.slice(0, 120)}...
            </p>

            <p className="text-sm text-gray-500 mt-4">
              Stock:{" "}
              <span className={stock > 0 ? "text-green-600" : "text-red-500"}>
                {stock > 0 ? `${stock} available` : "Out of stock"}
              </span>
            </p>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="bg-green-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
              >
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className="border border-gray-300 p-2.5 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    inWishlist
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                />
              </button>
              <button className="border border-gray-300 p-2.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {category && (
              <p className="text-sm text-gray-500 mt-6">
                Category: <span className="text-gray-700">{category.name}</span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-16">
          <div className="flex gap-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-medium cursor-pointer transition ${
                  activeTab === tab.key
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === "description" && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {description}
              </p>
            )}

            {activeTab === "additional" && (
              <table className="text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-2 pr-8 font-medium">Stock</td>
                    <td className="py-2">{stock}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-8 font-medium">Category</td>
                    <td className="py-2">{category?.name || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
