import { Link } from "react-router";
import { Minus, Plus, X } from "lucide-react";
import Container from "../../Components/Common/Container";
import { useCart } from "../../Context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div>
      <div className="relative bg-gray-900 h-40 flex items-center">
        <Container>
          <div className="text-sm text-white flex items-center gap-2">
            <Link to="/" className="hover:text-green-500">
              Home
            </Link>
            <span>/</span>
            <span className="text-green-500">Shopping cart</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-10">
          <h1 className="text-2xl font-bold mb-8">My Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">Your cart is empty.</p>
              <Link
                to="/shop"
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition inline-block"
              >
                Return to Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400 border-b border-gray-200">
                      <th className="pb-4 font-medium">Product</th>
                      <th className="pb-4 font-medium">Price</th>
                      <th className="pb-4 font-medium">Quantity</th>
                      <th className="pb-4 font-medium">Subtotal</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      const imageUrl = item.images?.[0]?.url
                        ? `http://localhost:1337${item.images[0].url}`
                        : "/placeholder.png";

                      const reachedMax = item.quantity >= item.stock;
                      // استخراج المعرف بأمان تام سواء documentId أو id
                      const itemId = item.documentId || item.id;

                      return (
                        <tr key={itemId} className="border-b border-gray-100">
                          <td className="py-5">
                            <div className="flex items-center gap-4">
                              <img
                                src={imageUrl}
                                alt={item.name}
                                className="w-14 h-14 object-contain"
                              />
                              <span className="text-sm text-gray-700">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-5 text-sm">${item.price}</td>
                          <td className="py-5">
                            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    itemId,
                                    Math.max(1, item.quantity - 1),
                                  )
                                }
                                className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => {
                                  if (!reachedMax) {
                                    updateQuantity(itemId, item.quantity + 1);
                                  }
                                }}
                                disabled={reachedMax}
                                className={`px-2 py-1.5 cursor-pointer ${
                                  reachedMax
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:bg-gray-100"
                                }`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {reachedMax && (
                              <p className="text-xs text-red-500 mt-1">
                                Max stock reached
                              </p>
                            )}
                          </td>
                          <td className="py-5 text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-5">
                            <button
                              onClick={() => removeFromCart(itemId)}
                              className="text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex justify-between items-center mt-8">
                  <Link
                    to="/shop"
                    className="border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    Return to shop
                  </Link>
                </div>

                <div className="flex items-center gap-3 mt-10 max-w-md">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none"
                  />
                  <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer">
                    Apply Coupon
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 h-fit">
                <h3 className="font-semibold text-lg mb-5">Cart Total</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>Subtotal</span>
                  <span className="text-gray-800">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <span>Shipping</span>
                  <span className="text-gray-800">Free</span>
                </div>
                <div className="flex justify-between font-semibold mb-5">
                  <span>Total</span>
                  <span className="text-green-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  className="block text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Proceed to checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Cart;
