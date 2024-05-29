import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../Checkout/Cart/scroll.css'

export default function OrderHistory() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white overflow-x-auto" id='style-2'>
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <p className="mb-8">
        Check the status of recent orders, manage returns, and discover similar products.
      </p>
      <div className="space-y-12"> {/* Increased the space between items */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-gray-500">Order number</div>
              <div>WU88191111</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Date placed</div>
              <div>Jul 6, 2021</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total amount</div>
              <div>$160.00</div>
            </div>
            <div className="flex space-x-2">
              <button className=" hover:bg-gray-100"><span className="border px-4 py-2 rounded-md">View Order</span></button>
              <button className=" hover:bg-gray-100"><span className="px-4 py-2 border rounded-md">View Invoice</span></button>
            </div>
          </div>
          <div className="space-y-6"> {/* Increased the space between items */}
            <div className="flex items-start space-x-4">
              <img
                alt="Micro Backpack"
                className="h-32 w-32" 
                height="96"
                src="https://theantiquestory.com/cdn/shop/products/IMG_2160-as-Smart-Object-1_540x.jpg?v=1540320931 "
                style={{
                  aspectRatio: "96/96",
                  objectFit: "cover",
                }}
                width="96"
              />
              <div className="flex-1">
                <h3 className="font-bold">Micro Backpack</h3>
                <p className="text-sm text-gray-600">
                  Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for
                  your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day
                  use.
                </p>
                <div className="text-sm text-gray-500 mt-2">$70.00</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full">Delivered on July 12, 2021</span>
              <div className="flex space-x-2">
                <button className="px-4 py-2 hover:underline">View product</button>
              </div>
            </div>
            <div className="mt-32 flex items-start space-x-4">
              <img
                alt="Nomad Shopping Tote"
                className="h-32 w-32" 
                height="96"
                src="https://theantiquestory.com/cdn/shop/products/IMG_2160-as-Smart-Object-1_540x.jpg?v=1540320931 "
                style={{
                  aspectRatio: "96/96",
                  objectFit: "cover",
                }}
                width="96"
              />
              <div className="flex-1">
                <h3 className="font-bold">Nomad Shopping Tote</h3>
                <p className="text-sm text-gray-600">
                  This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water,
                  fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry
                  options for a day out on your next adventure.
                </p>
                <div className="text-sm text-gray-500 mt-2">$90.00</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full">Delivered on July 12, 2021</span>
              <div className="flex space-x-2">
                <button className="px-4 py-2 hover:underline">View product</button>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}