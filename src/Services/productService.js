import api from "./api";

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
