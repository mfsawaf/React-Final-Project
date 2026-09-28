const Rating = ({ value = 0, max = 5 }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          className={index < value ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
