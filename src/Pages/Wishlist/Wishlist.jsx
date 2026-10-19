import { Link } from "react-router";
import { X } from "lucide-react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import Container from "../../Components/Common/Container";
import { useWishlist } from "../../Context/WishlistContext";
import { useCart } from "../../Context/CartContext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div>
      <div className="relative bg-gray-900 h-40 flex items-center">
        <Container>
          <div className="text-sm text-white flex items-center gap-2">
            <Link to="/" className="hover:text-green-500">
              Home
            </Link>
            <span>/</span>
            <span className="text-green-500">Wishlist</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-10">
          <h1 className="text-2xl font-bold mb-8 text-center">My Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
              <Link
                to="/shop"
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition inline-block"
              >
                Return to Shop
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-gray-200">
                  <th className="pb-4 font-medium">Product</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Stock Status</th>
                  <th className="pb-4"></th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => {
                  const imageUrl = item.images?.[0]?.url
                    ? `http://localhost:1337${item.images[0].url}`
                    : "/placeholder.png";
                  const inStock = item.stock > 0;

                  return (
                    <tr
                      key={item.documentId || item.id}
                      className="border-b border-gray-100"
                    >
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
                      <td className="py-5 text-sm font-medium">
                        ${item.price}
                      </td>
                      <td className="py-5">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            inStock
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="py-5">
                        <button
                          onClick={() => addToCart(item, 1)}
                          disabled={!inStock}
                          className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                            inStock
                              ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Add to Cart
                        </button>
                      </td>
                      <td className="py-5">
                        {/* تم تمرير الكائن كاملاً لضمان الحذف الدقيق سواء بـ id أو documentId */}
                        <button
                          onClick={() => removeFromWishlist(item)}
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
          )}

          {wishlistItems.length > 0 && (
            <div className="flex items-center gap-3 mt-8 text-sm text-gray-500">
              <span>Share:</span>
              <a
                href="#"
                className="bg-green-600 text-white p-1.5 rounded-full"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a href="#">
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Wishlist;
