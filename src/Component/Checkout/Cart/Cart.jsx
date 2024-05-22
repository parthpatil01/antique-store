import React, { useState, useEffect } from "react";
import axios from "axios";
import './scroll.css'

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const userEmail = 'ansariaman1603@gmail.com'; // Replace with the user's email
      const response = await axios.get(`http://localhost:5000/api/users/carts?email=${userEmail}`);
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const incrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity++;
    setCartItems(updatedCart);
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCartItems(updatedCart);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const removeItem = async (productName) => {
    try {
      const userEmail = 'ansariaman1603@gmail.com'; // Replace with the user's email
      await axios.delete(`http://localhost:5000/api/users/carts/${productName}?email=${userEmail}`);
      const updatedCartItems = cartItems.filter(item => item.name !== productName);
      setCartItems(updatedCartItems);
      alert("Product Sucessfully Removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 p-6 md:mt-16">
        <div className="left lg:col-span-2 md:pe-8 bg-white overflow-x-auto h-[80vh]" id="style-1">

        <div className="rounded-2xl border-2 border-gray-200 p-4 lg:m-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                    <div className="col-span-12 lg:col-span-2 img box">
                        <img src="https://theantiquestory.com/cdn/shop/products/IMG_2160-as-Smart-Object-1_540x.jpg?v=1540320931" alt="speaker image" className="max-lg:w-full lg:w-[180px] "/>
                    </div>
                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                        <div className="flex items-center justify-between w-full mb-4">
                            <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">Round white portable
                                speaker</h5>
                            <button className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                                        cx="17" cy="17" r="17" fill="" />
                                    <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                                        d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                                        stroke="#EF4444" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                            </button>
                        </div>
                        <p className="font-normal text-base leading-7 text-gray-500 mb-6 truncate">
                            Introducing our sleek round white portable speaker, the epitome of style and sound! Elevate your auditory experience with this compact yet powerful device that delivers crystal-clear audio wherever you go.
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        width="18" height="19" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 9.5H13.5" stroke="" stroke-width="1.6" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <div className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-1.5 bg-gray-100 "><p className="text-center mt-1">2</p></div>
                                <button
                                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        width="18" height="19" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" stroke-width="1.6"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row"><span className="text-gray-400 font-manrope font-bold text-xl leading-9 text-right"><strike>$220000</strike></span>
                            <span className="text-gray-600 ms-4 font-manrope font-bold text-xl leading-9 text-right">$220000</span></div>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border-2 border-gray-200 p-4 lg:m-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                    <div className="col-span-12 lg:col-span-2 img box">
                        <img src="https://theantiquestory.com/cdn/shop/products/IMG_9690-as-Smart-Object-1_540x.jpg?v=1539260774" alt="speaker image" className="max-lg:w-full lg:w-[180px] "/>
                    </div>
                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                        <div className="flex items-center justify-between w-full mb-4">
                            <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">Round white portable
                                speaker</h5>
                            <button className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                                        cx="17" cy="17" r="17" fill="" />
                                    <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                                        d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                                        stroke="#EF4444" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                            </button>
                        </div>
                        <p className="font-normal text-base leading-7 text-gray-500 mb-6 truncate">
                            Introducing our sleek round white portable speaker, the epitome of style and sound! Elevate your auditory experience with this compact yet powerful device that delivers crystal-clear audio wherever you go.
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        width="18" height="19" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 9.5H13.5" stroke="" stroke-width="1.6" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <div className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-1.5 bg-gray-100 "><p className="text-center mt-1">2</p></div>
                                <button
                                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        width="18" height="19" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" stroke-width="1.6"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row"><span className="text-gray-400 font-manrope font-bold text-xl leading-9 text-right"><strike>$220000</strike></span>
                            <span className="text-gray-600 ms-4 font-manrope font-bold text-xl leading-9 text-right">$220000</span></div>
                        </div>
                    </div>
                </div>
                
                <div className="rounded-2xl border-2 border-gray-200 p-4 lg:m-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                    <div className="col-span-12 lg:col-span-2 img box">
                        <img src="https://theantiquestory.com/cdn/shop/products/IMG_9958-as-Smart-Object-1_540x.jpg?v=1539348765" alt="speaker image" className="max-lg:w-full lg:w-[180px] "/>
                    </div>
                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                        <div className="flex items-center justify-between w-full mb-4">
                            <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">Round white portable
                                speaker</h5>
                            <button className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                                        cx="17" cy="17" r="17" fill="" />
                                    <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                                        d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                                        stroke="#EF4444" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                            </button>
                        </div>
                        <p className="font-normal text-base leading-7 text-gray-500 mb-6 truncate">
                            Introducing our sleek round white portable speaker, the epitome of style and sound! Elevate your auditory experience with this compact yet powerful device that delivers crystal-clear audio wherever you go.
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        width="18" height="19" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 9.5H13.5" stroke="" stroke-width="1.6" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <div className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-1.5 bg-gray-100 "><p className="text-center mt-1">2</p></div>
                                <button
                                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        width="18" height="19" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" stroke-width="1.6"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row"><span className="text-gray-400 font-manrope font-bold text-xl leading-9 text-right"><strike>$220000</strike></span>
                            <span className="text-gray-600 ms-4 font-manrope font-bold text-xl leading-9 text-right">$220000</span></div>
                        </div>
                    </div>
                </div>   
          
        </div>
        <div className="shadow-md h-fit p-6">
          <h3 className="text-xl text-[#333] font-bold border-b pb-4">Cart Summary</h3>
          <ul className="text-[#333] divide-y mt-6">
            <li className="flex flex-wrap gap-4 text-md py-4">Subtotal <span className="ml-auto font-bold">$55.5</span></li>
            <li className="flex flex-wrap gap-4 text-md py-4">Shipping <span className="ml-auto font-bold">$4.00</span></li>
            <li className="flex flex-wrap gap-4 text-md py-4">Tax <span className="ml-auto font-bold">$4.00</span></li>
            <li className="flex flex-wrap gap-4 text-md py-4 font-bold">Total <span className="ml-auto">$63.5</span></li>
          </ul>
          <div className="mt-10">
            <h3 className="text-lg text-[#333] mb-6 font-semibold">Apply promo code</h3>
            <div className="flex overflow-hidden max-w-md ">
              <input type="email" placeholder="Promo code"
                className="w-full border-none  bg-gray-50 text-gray-600 text-md px-4 py-2.5" />
              <button type='button' className="flex items-center rounded-e-md justify-center bg-[#444] hover:bg-[#333] px-6 text-md text-white">
                Apply
              </button>
            </div>
          </div>
          <button type="button" className="mt-10 md:mb-8 text-md px-6 py-3 w-full font-bold bg-[rgb(135,62,35)] hover:bg-[#A94E2D] text-white rounded-md"  >Check
            out</button>

          
        </div>
      </div>
  );
}

export default Cart;