import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetail, addToCart } from "../services/index";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const fetchProductDetail = async () => {
    const response = await getProductDetail(id);
    if (response) setProduct(response);
  };

  const handleQuantityChange = async (quantity = 1, increment) => {
    const response = await addToCart(
      id,
      increment ? quantity + 1 : quantity - 1
    );
    if (response?.success) {
      fetchProductDetail();
    }
  };

  const handleAddToCart = async () => {
    const response = await addToCart(id, 1);
    if (response?.success) {
      fetchProductDetail();
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => navigate("/products")}
      >
        Back to Products
      </button>
      <div className="border border-gray-200 rounded-lg p-8">
        <img
          className="h-40 w-40 object-cover"
          src={product.imageUrl}
          alt={product.name}
        />
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <div>${product.price}</div>
        {product.quantity > 0 ? (
          <div className="flex items-center gap-2 mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleQuantityChange(product.quantity, false)}
            >
              -
            </button>
            <span className="py-2 px-4">{product.quantity}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleQuantityChange(product.quantity, true)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
