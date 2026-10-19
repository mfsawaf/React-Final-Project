import api from "./api";

export const getAllProducts = async () => {
  const response = await api.get("/products?populate=*");
  return response.data.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get(
    "/products?filters[isFeatured][$eq]=true&populate=*",
  );
  return response.data.data;
};

export const getHotDeals = async () => {
  const response = await api.get(
    "/products?filters[isHotDeal][$eq]=true&populate=*",
  );
  return response.data.data;
};

export const getBestSellers = async () => {
  const response = await api.get(
    "/products?filters[isBestSeller][$eq]=true&populate=*",
  );
  return response.data.data;
};

export const getTopRated = async () => {
  const response = await api.get(
    "/products?filters[isTopRated][$eq]=true&populate=*",
  );
  return response.data.data;
};

export const getNewestProducts = async () => {
  const response = await api.get(
    "/products?sort=createdAt:desc&pagination[limit]=5&populate=*",
  );
  return response.data.data;
};

export const getProductsByCategory = async (categorySlug) => {
  const response = await api.get(
    `/products?filters[category][slug][$eq]=${categorySlug}&populate=*`,
  );
  return response.data.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}?populate=*`);
  return response.data.data;
};

export const updateProductStock = (documentId, newStock) => {
  return api.put(`/products/${documentId}`, {
    data: { stock: newStock },
  });
};

export const registerUser = (username, email, password) => {
  return api.post("/auth/local/register", { username, email, password });
};

export const loginUser = (identifier, password) => {
  return api.post("/auth/local", { identifier, password });
};

export const getCurrentUser = (jwt) => {
  return api.get("/users/me", {
    headers: { Authorization: `Bearer ${jwt}` },
  });
};

export const createOrder = (orderData, token) => {
  return api.post(
    "/orders",
    { data: orderData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getUserOrders = (token) => {
  return api.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = (passwordData, token) => {
  return api.post(
    "/auth/change-password",
    {
      currentPassword: passwordData.currentPassword,
      password: passwordData.newPassword,
      passwordConfirmation: passwordData.confirmPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const updateUserProfile = (userId, userData, token) => {
  return api.put(`/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadProfileImage = async (file, userId, token) => {
  const formData = new FormData();
  formData.append("files", file);
  formData.append("ref", "plugin::users-permissions.user");
  formData.append("refId", userId);
  formData.append("field", "avatar"); // أو اسم حقل الصورة عندك في Strapi زي 'image' أو 'profileImage'

  return api.post("/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
