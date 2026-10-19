import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  LuLayoutDashboard,
  LuHistory,
  LuHeart,
  LuShoppingBag,
  LuSettings,
  LuLogOut,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import Container from "../../Components/Common/Container";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { getUserOrders, changePassword } from "../../Services/productService";

const UserDashboard = () => {
  const { user, token, logout } = useAuth();
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [settingsForm, setSettingsForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setSettingsForm({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      const authToken =
        token || localStorage.getItem("jwt") || localStorage.getItem("token");

      if (!authToken) {
        setLoadingOrders(false);
        return;
      }

      try {
        setLoadingOrders(true);
        const response = await getUserOrders(authToken);
        const fetchedOrders = response.data?.data || response.data || [];
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error("Could not load order history");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleSettingsChange = (e) => {
    setSettingsForm({ ...settingsForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      toast.dismiss();
      toast.error("Please fill in all password fields!");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.dismiss();
      toast.error("New passwords do not match!");
      return;
    }

    const authToken =
      token || localStorage.getItem("jwt") || localStorage.getItem("token");

    try {
      await changePassword(passwordForm, authToken);

      // 1. التوجيه فوراً لصفحة اللوجن مع تمرير state
      navigate("/login", { state: { fromPasswordChange: true } });

      // 2. تنظيف الـ Context بعد التوجيه
      if (logout) {
        logout(true); // لو دالة logout عندك بتقل استدعاء توست
      }

      // 3. مسح أي توستات قديمة وإظهار رسالة النجاح فقط
      setTimeout(() => {
        toast.dismiss();
        toast.success("Password changed successfully! Please login again.");
      }, 50);
    } catch (err) {
      console.error("ERROR RESPONSE DATA:", err.response?.data);

      toast.dismiss();
      const serverMessage = err.response?.data?.error?.message;

      if (
        serverMessage &&
        serverMessage.toLowerCase().includes("current password")
      ) {
        toast.error("Incorrect current password!");
      } else {
        toast.error(serverMessage || "Failed to change password");
      }
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="relative bg-gray-900 h-36 flex items-center mb-10">
        <Container>
          <div className="text-sm text-gray-300 flex items-center gap-2">
            <Link to="/" className="hover:text-green-500">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-400">Account</span>
            <span>/</span>
            <span className="text-green-500 font-medium capitalize">
              {activeTab}
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="border border-gray-200 rounded-xl p-4 h-fit bg-white">
            <h3 className="font-semibold text-lg text-gray-900 mb-4 px-3">
              Navigation
            </h3>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-gray-100 text-gray-900 font-semibold border-l-4 border-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <LuLayoutDashboard className="w-5 h-5 text-gray-500" />
                Dashboard
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-gray-100 text-gray-900 font-semibold border-l-4 border-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <LuHistory className="w-5 h-5 text-gray-500" />
                Order History
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === "wishlist"
                    ? "bg-gray-100 text-gray-900 font-semibold border-l-4 border-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <LuHeart className="w-5 h-5 text-gray-500" />
                Wishlist
              </button>

              <button
                onClick={() => setActiveTab("cart")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === "cart"
                    ? "bg-gray-100 text-gray-900 font-semibold border-l-4 border-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <LuShoppingBag className="w-5 h-5 text-gray-500" />
                Shopping Cart
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-gray-100 text-gray-900 font-semibold border-l-4 border-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <LuSettings className="w-5 h-5 text-gray-500" />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
              >
                <LuLogOut className="w-5 h-5 text-gray-500" />
                Log-out
              </button>
            </nav>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6 text-center bg-white flex flex-col items-center justify-center">
                    <img
                      src={
                        user?.avatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                      }
                      alt="User Profile"
                      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-green-500"
                    />
                    <h4 className="font-bold text-lg text-gray-900">
                      {user?.username || user?.firstName || "User Profile"}
                    </h4>
                    <p className="text-xs text-gray-500 mb-4">
                      {user?.email || "Customer"}
                    </p>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className="text-green-600 font-semibold text-sm hover:underline cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6 bg-white flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2 block">
                        Billing Address
                      </span>
                      <h4 className="font-bold text-gray-900 text-base mb-2">
                        {user?.username || "My Account"}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">
                        {user?.address || "No address added yet"}
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        {user?.email}
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        {user?.phone || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className="text-green-600 font-semibold text-sm hover:underline cursor-pointer text-left mt-4 block"
                    >
                      Edit Address
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-gray-900">
                      Recent Order History
                    </h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-green-600 font-semibold text-sm hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>
                  {renderOrdersTable(orders.slice(0, 5), loadingOrders)}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="font-bold text-xl text-gray-900 mb-6">
                  Order History
                </h3>
                {renderOrdersTable(orders, loadingOrders)}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h3 className="font-bold text-xl text-gray-900">
                    Your Wishlist
                  </h3>
                  <Link
                    to="/wishlist"
                    className="text-sm text-green-600 font-semibold hover:underline"
                  >
                    Open Full Page
                  </Link>
                </div>

                {!wishlistItems || wishlistItems.length === 0 ? (
                  <p className="text-center py-8 text-gray-500 text-sm">
                    Your wishlist is empty.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistItems.map((rawItem) => {
                      const item = rawItem.product || rawItem;
                      const itemId = item.documentId || item.id || rawItem.id;
                      const imagePath =
                        item.images?.[0]?.url ||
                        item.image?.url ||
                        item.imageUrl;
                      const imageUrl = imagePath
                        ? imagePath.startsWith("http")
                          ? imagePath
                          : `http://localhost:1337${imagePath}`
                        : "/placeholder.png";

                      return (
                        <div
                          key={itemId}
                          className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center relative group bg-white shadow-sm hover:shadow transition"
                        >
                          <button
                            onClick={() => removeFromWishlist(item)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                          >
                            <LuTrash2 className="w-4 h-4" />
                          </button>
                          <img
                            src={imageUrl}
                            alt={item.name || item.title || "Product"}
                            className="w-20 h-20 object-contain mb-3"
                          />
                          <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-1">
                            {item.name || item.title || "Product"}
                          </h4>
                          <span className="text-green-600 font-bold text-sm">
                            ${item.price || 0}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === "cart" && (
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h3 className="font-bold text-xl text-gray-900">
                    Your Shopping Cart
                  </h3>
                  <Link
                    to="/checkout"
                    className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium transition"
                  >
                    Proceed to Checkout
                  </Link>
                </div>

                {!cartItems || cartItems.length === 0 ? (
                  <p className="text-center py-8 text-gray-500 text-sm">
                    Your cart is empty.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const imagePath =
                        item.images?.[0]?.url ||
                        item.image?.url ||
                        item.imageUrl;
                      const imageUrl = imagePath
                        ? imagePath.startsWith("http")
                          ? imagePath
                          : `http://localhost:1337${imagePath}`
                        : "/placeholder.png";

                      return (
                        <div
                          key={item.id || item.documentId}
                          className="flex items-center justify-between border-b border-gray-100 pb-3"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={imageUrl}
                              alt={item.name}
                              className="w-14 h-14 object-contain rounded"
                            />
                            <div>
                              <h4 className="font-semibold text-sm text-gray-800">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                ${item.price} x {item.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-sm text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() =>
                                removeFromCart(item.id || item.documentId)
                              }
                              className="text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                              <LuTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex justify-between items-center pt-4 font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-green-600">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Account Settings Form */}
                <div className="border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="font-bold text-xl text-gray-900 mb-6">
                    Account Settings
                  </h3>
                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={settingsForm.username}
                          onChange={handleSettingsChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={settingsForm.email}
                          onChange={handleSettingsChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={settingsForm.phone}
                          onChange={handleSettingsChange}
                          placeholder="Enter phone number"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Billing Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={settingsForm.address}
                          onChange={handleSettingsChange}
                          placeholder="Enter street address"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-600"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>

                {/* Change Password Form */}
                <div className="border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="font-bold text-xl text-gray-900 mb-6">
                    Change Password
                  </h3>
                  <form onSubmit={handleUpdatePassword} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-600"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition cursor-pointer"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

const renderOrdersTable = (ordersList, isLoading) => {
  if (isLoading) {
    return (
      <p className="text-center py-8 text-gray-500 text-sm">
        Loading orders...
      </p>
    );
  }

  if (!ordersList || ordersList.length === 0) {
    return (
      <p className="text-center py-8 text-gray-500 text-sm">No orders found.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-200">
            <th className="py-3 px-4 font-semibold">Order ID</th>
            <th className="py-3 px-4 font-semibold">Date</th>
            <th className="py-3 px-4 font-semibold">Total</th>
            <th className="py-3 px-4 font-semibold">Status</th>
            <th className="py-3 px-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {ordersList.map((order) => {
            const orderId = order.documentId
              ? `#${order.documentId.slice(0, 6)}`
              : `#${order.id}`;
            const orderDate = new Date(
              order.createdAt || order.publishedAt,
            ).toLocaleDateString();
            const orderTotal = `$${Number(order.total || 0).toFixed(2)}`;
            const orderStatus =
              order.orderStautus || order.orderStatus || "Pending";

            return (
              <tr
                key={order.id || order.documentId}
                className="hover:bg-gray-50 transition"
              >
                <td className="py-4 px-4 font-medium text-gray-900">
                  {orderId}
                </td>
                <td className="py-4 px-4 text-gray-600">{orderDate}</td>
                <td className="py-4 px-4 text-gray-800 font-medium">
                  {orderTotal}
                </td>
                <td className="py-4 px-4 text-gray-700 capitalize">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      orderStatus.toLowerCase() === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {orderStatus}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-green-600 font-medium hover:underline cursor-pointer">
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
