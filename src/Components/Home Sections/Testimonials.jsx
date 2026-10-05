import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Robert Fox",
    role: "Customer",
    image: "/client1.jpg",
    rating: 5,
    text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
  },
  {
    name: "Dianne Russell",
    role: "Customer",
    image: "/client2.jpg",
    rating: 5,
    text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
  },
  {
    name: "Eleanor Pena",
    role: "Customer",
    image: "/client3.jpg",
    rating: 5,
    text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[#EDF2EE] py-16 px-6 rounded-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Client Testimonial</h2>
        <div className="w-10 h-1 bg-green-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <Quote className="w-8 h-8 text-green-200 fill-green-200" />
            <p className="text-sm text-gray-600 mt-3 mb-5">{item.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 text-sm">
                {"★".repeat(item.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
