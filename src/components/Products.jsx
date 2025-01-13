import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, addToCart, getCartDetail } from "../services/index";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    const response = await getAllProducts();
    if (response) setProducts(response);
  };

  const fetchCart = async () => {
    const response = await getCartDetail();
    if (response?.items) {
      setCartItems(response.items.filter((item) => item.cartQuantity > 0));
    }
  };

  const addToCard = async (id) => {
    const response = await addToCart(id, 1);
    if (response?.success) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCart();
  }, []);

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.productId === productId);
  };

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
          <div className="border border-gray-200 rounded-lg p-4" key={product.id}>
            <div onClick={() => navigate(`/products/${product.id}`)}>
              <img
                className="h-40 w-40 object-cover"
                src={product.imageUrl}
                alt={product.name}
              />
              <div>{product.name}</div>
              <div>${product.price}</div>
            </div>
            {isProductInCart(product.id) ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => addToCard(product.id)}
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
