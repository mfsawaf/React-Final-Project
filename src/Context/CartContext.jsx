import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false); // جديد

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const availableStock = product?.stock ?? product?.attributes?.stock ?? 0;
    const productId = product.documentId || product.id;
    const existing = cartItems.find(
      (item) => (item.documentId || item.id) === productId,
    );
    const currentQtyInCart = existing ? existing.quantity : 0;

    if (currentQtyInCart + quantity > availableStock) {
      toast.error(`Only ${availableStock} items available in stock!`);
      return;
    }

    setCartItems((prev) => {
      if (existing) {
        return prev.map((item) =>
          (item.documentId || item.id) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, stock: availableStock, quantity }];
    });

    toast.success("Item added to cart! 🛒");
    setIsCartOpen(true); // يفتح تلقائيًا
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => (item.documentId || item.id) !== productId),
    );
    toast.error("Item removed from cart");
  };

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.find((i) => (i.documentId || i.id) === productId);
    if (!item) return;

    if (quantity > item.stock) {
      toast.error(`Only ${item.stock} items available in stock!`);
      return;
    }

    if (quantity < 1) return;

    setCartItems((prev) =>
      prev.map((i) =>
        (i.documentId || i.id) === productId ? { ...i, quantity } : i,
      ),
    );
  };

  const clearCart = (showToast = true) => {
    setCartItems([]);
    localStorage.removeItem("cart"); // أو حسب طريقة تخزينك للسلة

    if (showToast) {
      toast.success("Cart cleared successfully!");
    }
  };
  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
