import { Link } from "react-router";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useQuickView } from "../../Context/QuickViewContext";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";

const ProductCard = ({ product }) => {
  const { documentId, name, price, rating, images } = product;
  const { openQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // ابعت المنتج كامل أو الـ documentId لضمان دقة المقارنة
  const inWishlist = isInWishlist(product);

  const imageUrl = images?.[0]?.url
    ? `http://localhost:1337${images[0].url}`
    : "/placeholder.png";

  return (
    <Link
      to={`/product/${documentId}`}
      className="group relative border border-gray-200 rounded-lg p-4 hover:border-green-500 transition cursor-pointer block bg-white"
    >
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-40 object-contain" />

        <div className="absolute top-0 right-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                inWishlist
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700 hover:text-red-500"
              }`}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h4 className="mt-3 text-sm text-gray-700">{name}</h4>

      <div className="flex items-center gap-2 mt-1">
        <span className="font-semibold">${price}</span>
      </div>

      <div className="flex text-yellow-400 text-sm mt-1">
        {"★".repeat(Math.round(rating || 0))}
        {"☆".repeat(5 - Math.round(rating || 0))}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product, 1);
        }}
        className="absolute bottom-4 right-4 bg-gray-100 hover:bg-green-600 hover:text-white p-2 rounded-full transition cursor-pointer"
      >
        <ShoppingBag className="w-4 h-4" />
      </button>
    </Link>
  );
};

export default ProductCard;
