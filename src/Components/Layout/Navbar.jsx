import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Search,
  Heart,
  ShoppingBag,
  Phone,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { useAuth } from "../../Context/AuthContext";
import MiniCart from "../../Pages/Cart/MiniCart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, cartTotal, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Pages", href: "/pages" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="hidden md:flex justify-between items-center px-6 py-2 border-b border-gray-100 text-sm text-gray-500">
        <span>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            {/* تم تحويل اسم المستخدم لرابط يوجه لصفحة الـ Dashboard */}
            <Link
              to="/dashboard"
              className="flex items-center gap-1 font-medium text-gray-700 hover:text-green-600 transition cursor-pointer"
            >
              <User className="w-4 h-4 text-green-600" />
              <span>{user?.username}</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        ) : (
          !isAuthPage && (
            <Link to="/login" className="hover:text-green-600 transition">
              Sign In / Sign Up
            </Link>
          )
        )}
      </div>

      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-green-600">
          Ecobazar
        </Link>

        <div className="hidden md:flex items-center border border-gray-200 rounded overflow-hidden w-100">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="bg-green-600 text-white px-5 py-2 flex items-center gap-2 hover:bg-green-700 transition">
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        <div className="flex items-center gap-5">
          <Link to="/wishlist" className="relative cursor-pointer">
            <Heart
              className={`w-5 h-5 ${
                wishlistCount > 0 ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleCart}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="hidden md:block text-sm">
                <p className="text-gray-400">Shopping cart:</p>
                <p className="font-semibold">${cartTotal.toFixed(2)}</p>
              </div>
            </div>

            <MiniCart />
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="hidden md:flex justify-between items-center bg-gray-900 text-white px-6 py-3">
        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-1 hover:text-green-500 transition text-sm font-medium"
            >
              {link.name}
              <ChevronDown className="w-3 h-3" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4" />
          (219) 555-0114
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 bg-gray-900 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
