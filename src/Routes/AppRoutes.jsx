import { Routes, Route } from "react-router";
import Home from "../Home/Index";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<div>Contact Page - Coming Soon</div>} />
      <Route path="/shop" element={<div>Shop Page - Coming Soon</div>} />
      <Route path="/about" element={<div>About Page - Coming Soon</div>} />
      <Route path="/faqs" element={<div>FAQs Page - Coming Soon</div>} />
    </Routes>
  );
};

export default AppRoutes;
