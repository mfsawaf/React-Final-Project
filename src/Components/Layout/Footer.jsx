import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const instagramImages = [
    "/insta1.jpg",
    "/insta2.jpg",
    "/insta3.jpg",
    "/insta4.jpg",
    "/insta5.jpg",
    "/insta6.jpg",
  ];

  return (
    <footer>
      {/* Instagram Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">
        <h3 className="text-xl font-semibold mb-6">Follow us on Instagram</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {instagramImages.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded group cursor-pointer"
            >
              <img
                src={img}
                alt="Instagram post"
                className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition duration-300">
                <FaInstagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-2xl font-bold text-green-600">Ecobazar</span>
          <div className="text-center md:text-left">
            <h4 className="font-semibold">Subcribe our Newsletter</h4>
            <p className="text-sm text-gray-500">
              Pellentesque eu nibh eget mauris congue mattis matti.
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-64 px-4 py-2 border border-gray-300 rounded-l outline-none"
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-r hover:bg-green-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold mb-3">About Shopery</h4>
            <p className="text-sm mb-3">
              Morbi cursus portitor enim lobortis molestie. Duis gravida turpis
              dui eget bibendum magna congue nec.
            </p>
            <p className="text-sm">
              <a href="tel:2195550114" className="text-green-500 underline">
                (219) 555-0114
              </a>{" "}
              or{" "}
              <a
                href="mailto:Proxy@gmail.com"
                className="text-green-500 underline"
              >
                Proxy@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">My Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/account">My Account</Link>
              </li>
              <li>
                <Link to="/orders">Order History</Link>
              </li>
              <li>
                <Link to="/cart">Shoping Cart</Link>
              </li>
              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Helps</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/faqs">Faqs</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Condition</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Proxy</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/product">Product</Link>
              </li>
              <li>
                <Link to="/product-details">Products Details</Link>
              </li>
              <li>
                <Link to="/track-order">Track Order</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold mb-3">
              Download our Mobile App
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="bg-black border border-gray-700 rounded px-3 py-2 text-xs"
              >
                Download on the App Store
              </a>
              <a
                href="#"
                className="bg-black border border-gray-700 rounded px-3 py-2 text-xs"
              >
                Download on Google play
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <div className="flex gap-3">
            <a href="#" className="bg-green-600 text-white p-2 rounded-full">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#">
              <FaTwitter className="mt-1.5 w-10 h-5" />
            </a>
            <a href="#">
              <FaInstagram className="mt-1.5 w-10 h-5" />
            </a>
          </div>
          <span>Ecobazar eCommerce © 2021, All Rights Reserved</span>
          <span>Visa, Mastercard, PayPal...</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
