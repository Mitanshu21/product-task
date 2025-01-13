import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/index";
import {
  fetchCartItems,
  isProductInCart,
  addItemToCart,
} from "../utils/cartUtils";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    const response = await getAllProducts();
    if (response) setProducts(response);
  };

  const fetchCart = async () => {
    const items = await fetchCartItems();
    setCartItems(items);
  };

  const handleAddToCart = async (id) => {
    const response = await addItemToCart(id, () => navigate("/cart"));
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCart();
  }, []);

  return (
    <div className="p-4">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => navigate("/cart")}
      >
        View Cart
      </button>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2 justify-between"
            key={product.id}
          >
            <div onClick={() => navigate(`/products/${product.id}`)}>
              <img
                className="h-40 w-full object-cover"
                src={product.imageUrl}
                alt={product.name}
              />
              <div>{product.name}</div>
              <div>${product.price}</div>
            </div>
            {isProductInCart(product.id, cartItems) ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
