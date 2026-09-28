const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  className = "",
}) => {
  const baseStyles =
    "w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2";
  const stateStyles = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-green-500";

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseStyles} ${stateStyles} ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
