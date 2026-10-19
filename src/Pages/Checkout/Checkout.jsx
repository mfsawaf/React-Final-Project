import { useState } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import Container from "../../Components/Common/Container";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { createOrder } from "../../Services/productService";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    notes: "",
    shipToDifferentAddress: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const authToken =
      token || localStorage.getItem("jwt") || localStorage.getItem("token");

    if (!authToken) {
      toast.error("Please login first to complete your order!");
      navigate("/login");
      return;
    }

    const orderData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      country: "Egypt",
      state: form.state,
      zipCode: form.zipCode,
      notes: form.notes,
      paymentMethod,
      total: Number(cartTotal),
      orderStatus: "pending",
      item: cartItems.map((item) => ({
        id: item.documentId || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      setLoading(true);
      await createOrder(orderData, authToken);
      toast.success("Order placed successfully! 🎉");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Order error details:", err.response?.data);
      const message =
        err.response?.data?.error?.message ||
        "Something went wrong while placing your order";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-gray-500 mb-4">
            Your cart is empty, add products before checkout.
          </p>
          <Link
            to="/shop"
            className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition inline-block"
          >
            Return to Shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <div className="relative bg-gray-900 h-40 flex items-center">
        <Container>
          <div className="text-sm text-white flex items-center gap-2">
            <Link to="/" className="hover:text-green-500">
              Home
            </Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-green-500">
              Shopping Cart
            </Link>
            <span>/</span>
            <span className="text-green-500">Checkout</span>
          </div>
        </Container>
      </div>

      <Container>
        <form onSubmit={handlePlaceOrder} className="py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-6">Billing Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company name (optional)"
                  value={form.company}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none text-gray-500"
                >
                  <option value="">Governorate</option>
                  <option value="cairo">Cairo</option>
                  <option value="giza">Giza</option>
                  <option value="alexandria">Alexandria</option>
                  <option value="fayyoum">Fayyoum</option>
                  <option value="sinai">Sinai</option>
                  <option value="sharqia">Sharqia</option>
                  <option value="dakahlia">Dakahlia</option>
                  <option value="qalyubia">Qalyubia</option>
                </select>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={form.zipCode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div className="mb-10">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="shipToDifferentAddress"
                    checked={form.shipToDifferentAddress}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        shipToDifferentAddress: e.target.checked,
                      })
                    }
                    className="accent-green-600"
                  />
                  Ship to a different address
                </label>
              </div>

              <h2 className="text-xl font-bold mb-3">Additional Info</h2>
              <label className="text-sm text-gray-500 mb-2 block">
                Order Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Notes about your order, e.g. special notes for delivery"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none resize-none"
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-6 h-fit">
              <h3 className="font-semibold text-lg mb-5">Order Summary</h3>

              <div className="space-y-4 mb-5">
                {cartItems.map((item) => {
                  const imageUrl = item.images?.[0]?.url
                    ? `http://localhost:1337${item.images[0].url}`
                    : "/placeholder.png";

                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="flex-1 text-sm text-gray-700">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-sm text-gray-500 mb-3 pt-4 border-t border-gray-200">
                <span>Subtotal</span>
                <span className="text-gray-800">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                <span>Shipping</span>
                <span className="text-gray-800">Free</span>
              </div>
              <div className="flex justify-between font-semibold mb-6">
                <span>Total</span>
                <span className="text-green-600">${cartTotal.toFixed(2)}</span>
              </div>

              <h4 className="font-semibold mb-3">Payment Method</h4>
              <div className="space-y-2 mb-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-green-600"
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-green-600"
                  />
                  Paypal
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="amazon"
                    checked={paymentMethod === "amazon"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-green-600"
                  />
                  Amazon Pay
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer disabled:opacity-60"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Checkout;
