import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const getProductId = (param) => {
    if (!param) return null;
    if (typeof param === "object") {
      return param.documentId || param.id;
    }
    return param;
  };

  const isInWishlist = (productOrId) => {
    const targetId = getProductId(productOrId);
    if (!targetId) return false;
    return wishlistItems.some(
      (item) => (item.documentId || item.id) === targetId,
    );
  };

  const addToWishlist = (product) => {
    const productId = getProductId(product);

    setWishlistItems((prev) => {
      if (prev.some((item) => (item.documentId || item.id) === productId)) {
        return prev;
      }
      return [...prev, product];
    });

    toast.success("Added to wishlist ❤️");
  };

  const removeFromWishlist = (productOrId) => {
    const targetId = getProductId(productOrId);
    if (!targetId) return;

    setWishlistItems((prev) =>
      prev.filter((item) => (item.documentId || item.id) !== targetId),
    );
    toast.error("Removed from wishlist");
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product)) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
