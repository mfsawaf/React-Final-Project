import Button from "../Common/Button";

const PromoBanners = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
      {/* Banner 1 - Sale of the Month */}
      <div className="bg-[#4A90D9] rounded-xl p-6 text-white relative overflow-hidden h-105">
        <img
          src="/Banner-vegetables.jpg"
          alt="Vegetables"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-wide text-center">
            Best Deals
          </p>
          <h3 className="text-2xl font-bold text-center mt-2">
            Sale of the Month
          </h3>
          <div className="flex justify-center gap-3 mt-4 text-center text-sm">
            <div>
              <p className="font-bold text-lg">00</p>
              <p className="text-xs">Days</p>
            </div>
            <div>
              <p className="font-bold text-lg">02</p>
              <p className="text-xs">Hours</p>
            </div>
            <div>
              <p className="font-bold text-lg">18</p>
              <p className="text-xs">Mins</p>
            </div>
            <div>
              <p className="font-bold text-lg">46</p>
              <p className="text-xs">Secs</p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button />
          </div>
        </div>
      </div>

      {/* Banner 2 - Low-Fat Meat */}
      <div className="bg-black rounded-xl p-6 text-white relative overflow-hidden h-105">
        <img
          src="/Banner-meat.jpg"
          alt="Meat"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-wide text-center">
            85% Fat Free
          </p>
          <h3 className="text-2xl font-bold text-center mt-2">Low-Fat Meat</h3>
          <p className="text-center text-sm mt-2">
            Started at{" "}
            <span className="text-orange-400 font-semibold">$79.99</span>
          </p>
          <div className="flex justify-center mt-2">
            <Button />
          </div>
        </div>
      </div>

      {/* Banner 3 - Fresh Fruit */}
      <div className="bg-[#F5C816] rounded-xl p-6 text-gray-900 relative overflow-hidden h-105">
        <img
          src="/Banner-fruit.jpg"
          alt="Fruit"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-wide text-center">
            Summer Sale
          </p>
          <h3 className="text-2xl font-bold text-center mt-2">
            100% Fresh Fruit
          </h3>
          <p className="text-center text-sm mt-2">
            Up to{" "}
            <span className="bg-black text-white px-2 py-0.5 rounded font-semibold">
              64% Off
            </span>
          </p>
          <div className="flex justify-center mt-4">
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanners;
