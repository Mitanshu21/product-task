import { api } from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetail = async (productId) => {
  try {
    const response = await api.get(`products/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCartDetail = async () => {
  try {
    const response = await api.get("cart");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post("cart", { productId, quantity });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
