const ProductListItem = ({ product }) => {
  const { name, price, oldPrice, images } = product;
  const imageUrl = images?.[0]?.url
    ? `http://localhost:1337${images[0].url}`
    : "/placeholder.png";

  return (
    <div className="flex items-center gap-3 border border-gray-100 rounded-lg p-2 hover:border-green-500 transition">
      <img src={imageUrl} alt={name} className="w-14 h-14 object-contain" />
      <div>
        <p className="text-sm text-gray-700">{name}</p>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">${price}</span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-xs">
              ${oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
