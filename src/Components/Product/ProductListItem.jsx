import { useQuickView } from "../../Context/QuickViewContext";

const ProductListItem = ({ product }) => {
  const { name, price, images } = product;
  const { openQuickView } = useQuickView();

  const imageUrl = images?.[0]?.url
    ? `http://localhost:1337${images[0].url}`
    : "/placeholder.png";

  return (
    <div
      onClick={() => openQuickView(product)}
      className="flex items-center gap-3 border border-gray-100 rounded-lg p-2 hover:border-green-500 transition cursor-pointer"
    >
      <img src={imageUrl} alt={name} className="w-14 h-14 object-contain" />
      <div>
        <p className="text-sm text-gray-700">{name}</p>
        <span className="font-semibold text-sm">${price}</span>
      </div>
    </div>
  );
};

export default ProductListItem;
