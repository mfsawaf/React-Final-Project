import { X, Minus, Plus, Heart } from "lucide-react";
import { useState } from "react";
import { useQuickView } from "../../Context/QuickViewContext";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";

const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const { name, description, price, stock, rating, images, category } =
    quickViewProduct;

  // ✅ تعديل: إرسال المنتج كاملاً
  const inWishlist = isInWishlist(quickViewProduct);

  const imageUrl = images?.[0]?.url
    ? `http://localhost:1337${images[0].url}`
    : "/placeholder.png";

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={closeQuickView}
    >
      <div
        className="bg-white rounded-xl max-w-3xl w-full p-6 relative grid grid-cols-1 md:grid-cols-2 gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gray-50 rounded-lg flex items-center justify-center p-6">
          <img src={imageUrl} alt={name} className="max-h-64 object-contain" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{name}</h2>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="flex text-yellow-400 text-sm mt-2">
            {"★".repeat(Math.round(rating || 0))}
            {"☆".repeat(5 - Math.round(rating || 0))}
          </div>

          <p className="text-2xl font-semibold text-green-600 mt-3">${price}</p>

          <p className="text-sm text-gray-500 mt-3">
            {description?.slice(0, 100)}...
          </p>

          <div className="flex items-center gap-3 mt-5">
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
              onClick={() => {
                addToCart(quickViewProduct, quantity);
                closeQuickView();
              }}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
            >
              Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(quickViewProduct)}
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
          </div>

          {category && (
            <p className="text-sm text-gray-500 mt-5">
              Category: <span className="text-gray-700">{category.name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
