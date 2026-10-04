import { Truck, Headphones, ShieldCheck, Package } from "lucide-react";

const FeaturesBar = () => {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-green-600" />,
      title: "Free Shipping",
      desc: "Free shipping on all your order",
    },
    {
      icon: <Headphones className="w-6 h-6 text-green-600" />,
      title: "Customer Support 24/7",
      desc: "Instant access to Support",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: "100% Secure Payment",
      desc: "We ensure your money is save",
    },
    {
      icon: <Package className="w-6 h-6 text-green-600" />,
      title: "Money-Back Guarantee",
      desc: "30 Days Money-Back Guarantee",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg -mt-10 relative z-10 py-6 px-8 w-[90%] mx-auto box-shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-full">{feature.icon}</div>
            <div>
              <h4 className="font-semibold text-sm">{feature.title}</h4>
              <p className="text-xs text-gray-400">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesBar;
