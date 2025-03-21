import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import makeRequestWithToken from "../../helper/makeRequestWithToken";
import { selectEmail } from "../slices/authSlice";
import { useSelector } from "react-redux";
import formatIndianCurrency from "../../helper/formatIndianCurrency";

export default function OrderHistory() {
  const email = useSelector(selectEmail);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await makeRequestWithToken("/verifiedUsers/orders", "POST", { email });
        if (response?.data?.orders) {
          setOrders(response.data.orders);
        } else {
          setOrders([]); // Ensure orders is an empty array if no data is returned
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [email]);

  if (loading) {
    return <div className="flex h-full w-screen justify-center items-center">Loading...</div>;
  }

  return (
    <section className="flex justify-center pt-20 bg-white overflow-x-auto w-full md:w-[900px]" id="style-2">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="font-manrope font-bold text-xl min-[400px]:text-2xl text-black mb-8 text-left">Order History</h1>
        <p className="mb-8 text-gray-600">Check the status of recent orders and manage returns.</p>

        {orders.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh] w-full">No records found</div>
        ) : (
          <div className="space-y-12">
            {orders.map((order, index) => (
              <div key={index} className="border rounded-lg p-6 shadow-sm bg-gray-50">
                <div className="flex justify-between items-center mb-4 text-gray-800">
                  <div>
                    <div className="text-sm text-gray-500">Order number</div>
                    <div className="font-medium">{order.invoice.invoiceNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date placed</div>
                    <div className="font-medium">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total amount</div>
                    <div className="font-medium">
                      {formatIndianCurrency(
                        order.product.reduce((sum, item) => sum + item.price, 0) * 1.15 + 500
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="border px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                      View Order
                    </button>
                    <button className="border px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                      View Invoice
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {order.product.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-3 bg-white rounded-md shadow-sm">
                      <img
                        alt={item.name}
                        className="h-32 w-32 rounded-md border object-cover"
                        src={item.images[0]}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p
                          className="text-sm text-gray-600 mt-1"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.description}
                        </p>
                        <div className="text-sm text-gray-700 mt-2 font-medium">
                          {formatIndianCurrency(item.price)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">
                          Delivery is in Transit
                        </span>
                        <Link to={`/product-detail/${item._id}`} target="_blank">
                          <button className="mt-2 px-4 py-2 text-blue-600 text-sm hover:underline">
                            View Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="h-[50px]"></div>
      </div>
    </section>
  );
}