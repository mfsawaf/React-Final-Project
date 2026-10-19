import { Link } from "react-router";
import { X } from "lucide-react";
import { useCart } from "../../Context/CartContext";

const MiniCart = () => {
  const { cartItems, cartTotal, removeFromCart, isCartOpen, closeCart } =
    useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-sm bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-semibold text-lg">
            Shopping Card ({cartItems.length})
          </h3>
          <button onClick={closeCart} className="cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-10">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => {
              const itemId = item.documentId || item.id;
              const imageUrl = item.images?.[0]?.url
                ? `http://localhost:1337${item.images[0].url}`
                : "/placeholder.png";

              return (
                <div
                  key={itemId}
                  className="flex items-center gap-3 p-5 border-b border-gray-50"
                >
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded bg-gray-50"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} x {item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(itemId)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-gray-500">{cartItems.length} Product</span>
              <span className="font-semibold text-lg">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              onClick={closeCart}
              className="block text-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition mb-2"
            >
              Checkout
            </Link>

            <Link
              to="/cart"
              onClick={closeCart}
              className="block text-center border border-green-600 text-green-600 hover:bg-green-50 py-2.5 rounded-lg font-medium transition"
            >
              Go To Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCart;
