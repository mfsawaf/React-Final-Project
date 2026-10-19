import { Routes, Route } from "react-router";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Pages/Home/Index";
import Shop from "../Pages/Shop/Index";
import ProductDetails from "../Components/Product/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Checkout from "../Pages/Checkout/Checkout";
import UserDashboard from "../Pages/Account/UserDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<div>Contact Page - Coming Soon</div>} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/about" element={<div>About Page - Coming Soon</div>} />
      <Route path="/faqs" element={<div>FAQs Page - Coming Soon</div>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
