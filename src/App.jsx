import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast"; // استيراد Toaster

import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import AppRoutes from "./Routes/AppRoutes";
import { QuickViewProvider } from "./Context/QuickViewContext";
import { CartProvider } from "./Context/CartContext";
import QuickViewModal from "./Components/Product/QuickViewModal";
import ScrollToTop from "./Components/Common/ScrollToTop";
import { WishlistProvider } from "./Context/WishlistContext";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <QuickViewProvider>
              <Toaster reverseOrder={false} position="top-center" />
              <ScrollToTop />
              <Navbar />
              <AppRoutes />
              <Footer />
              <QuickViewModal />
            </QuickViewProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
