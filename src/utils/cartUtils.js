import { addToCart, getCartDetail } from "../services";

export const handleQuantityChange = async (
  productId,
  quantity = 1,
  increment,
  callback
) => {
  const response = await addToCart(
    productId,
    increment ? quantity + 1 : quantity - 1
  );
  if (response?.success && callback) {
    callback();
  }
  return response;
};

export const fetchCartItems = async () => {
  const response = await getCartDetail();
  if (response?.items) {
    return response.items.filter((item) => item.cartQuantity > 0);
  }
  return [];
};

export const isProductInCart = (productId, cartItems = []) => {
  return cartItems.some((item) => item.productId === productId);
};

export const addItemToCart = async (productId, callback) => {
  const response = await addToCart(productId, 1);
  if (response?.success && callback) {
    callback();
  }
  return response;
};
