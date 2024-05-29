import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShoppingGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://antique-store-backend.vercel.app/api/products");
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white ">
      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        {!loading && <h2 className="font-manrope font-bold text-xl min-[400px]:text-2xl text-black mb-8">Products</h2>}
        
        {loading ? (
          <div className="text-center text-lg font-medium text-gray-700">Loading...</div>
        ) : (
          
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">{products.map((product) => (
              <Link to={`/product-detail/${product._id}`} className="group" key={product._id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full md:h-[300px] md:w-[300px] bg-gray-50 object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">₹{product.price}</p>
              </Link>
            ))}</div>
        )}

      </div>
    </div>
  );
}
