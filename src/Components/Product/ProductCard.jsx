import { Heart, Eye, ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  const { name, price, oldPrice, rating, images } = product;
  const imageUrl = images?.[0]?.url
    ? `http://localhost:1337${images[0].url}`
    : "/placeholder.png";

  return (
    <div className="group relative border border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-40 object-contain" />

        <div className="absolute top-0 right-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h4 className="mt-3 text-sm text-gray-700">{name}</h4>

      <div className="flex items-center gap-2 mt-1">
        <span className="font-semibold">${price}</span>
        {oldPrice && (
          <span className="text-gray-400 line-through text-sm">
            ${oldPrice}
          </span>
        )}
      </div>

      <div className="flex text-yellow-400 text-sm mt-1">
        {"★".repeat(Math.round(rating || 0))}
        {"☆".repeat(5 - Math.round(rating || 0))}
      </div>

      <button className="absolute bottom-4 right-4 bg-gray-100 group-hover:bg-green-600 group-hover:text-white p-2 rounded-full transition">
        <ShoppingBag className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ProductCard;
