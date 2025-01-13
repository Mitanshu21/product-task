import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartDetail } from "../services/index";
import { handleQuantityChange } from "../utils/cartUtils";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchCartProducts = async () => {
    const response = await getCartDetail();
    if (response) {
      const activeItems = response.items
        .filter((item) => item.cartQuantity > 0)
        .sort((a, b) => a.productId - b.productId);
      setCartItems(activeItems);
      setTotal(response.total);
    }
  };

  const updateQuantity = async (productId, quantity, increment) => {
    await handleQuantityChange(
      productId,
      quantity,
      increment,
      fetchCartProducts
    );
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="p-4">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => navigate("/products")}
      >
        &lt; Back to Products
      </button>
      <div>
        <div className="text-2xl font-bold mb-4">Total: ${total || 0}</div>
        {cartItems.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          cartItems.map((product) => (
            <div
              className="border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center"
              key={product.productId}
            >
              <div className="h-40 w-40 object-cover">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div>{product.name}</div>
              <div>${product.price}</div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    updateQuantity(
                      product.productId,
                      product.cartQuantity,
                      false
                    )
                  }
                >
                  -
                </button>
                <span className="py-2 px-4">{product.cartQuantity}</span>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    updateQuantity(
                      product.productId,
                      product.cartQuantity,
                      true
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
