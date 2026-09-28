const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg w-fit">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="px-3 py-1 text-lg font-medium hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        −
      </button>
      <span className="px-4 py-1 text-center min-w-2rem">{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="px-3 py-1 text-lg font-medium hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
