import api from "./api";

export const getAllProducts = async () => {
  const response = await api.get("/products?populate=*");
  return response.data.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}?populate=*`);
  return response.data.data;
};