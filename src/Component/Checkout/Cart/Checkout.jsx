
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from '../../Assets/logo.png'
import './scroll.css'
import { useSelector } from "react-redux";
import { selectEmail } from "../../slices/authSlice";
import makeRequestWithToken from "../../../helper/makeRequestWithToken";
import { useNavigate } from "react-router-dom";
import formatIndianCurrency from "../../../helper/formatIndianCurrency";

export default function Checkout() {

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    streetAddress: '',
    city: '',
    region: '',
    postalCode: '',
    cart: []
  });

  const [userInfoBilling, setUserInfoBilling] = useState({
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    city: '',
    region: '',
    postalCode: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setUserInfoBilling((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };


  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const email = useSelector(selectEmail);


  useEffect(() => {
    // Fetch user information from the server
    fetchUserInfoFromServer()
      .then((data) => {

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          ...data // Merge fetched data with existing user information
        }));

        setUserInfoBilling((prevUserInfo) => ({
          ...prevUserInfo,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          streetAddress: data.streetAddress,
          city: data.city,
          region: data.region,
          postalCode: data.postalCode
        }));

        fetchProductsByCart(data.email);

      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });

    const fetchProductsByCart = async (email) => {
      try {
        makeRequestWithToken('/verifiedUsers/cart', 'POST', { email }).then(response => {
          if (response) {

            const products = response.data.cart;
            setCartItems(products);
          }
        })
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

  }, []);

  const fetchUserInfoFromServer = async () => {
    try {
      const response = await makeRequestWithToken('/users', 'POST', {email} );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user information:', error);
      throw new Error('Failed to fetch user information');
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
      if (totalPrice !== 0) {
        const calculatedTax = totalPrice * 0.15;
        setTotal(totalPrice + calculatedTax + 500);
      }
    }
  }, [cartItems]);


  // Razor pay
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    // Validate all required fields before proceeding
    const requiredShippingFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'streetAddress',
      'city',
      'region',
      'postalCode'
    ];
    
    const requiredBillingFields = [
      'firstName',
      'lastName',
      'streetAddress',
      'city',
      'region',
      'postalCode'
    ];
  
    // Check shipping info
    const missingShippingFields = requiredShippingFields.filter(
      field => !userInfo[field]
    );
    
    // Check billing info
    const missingBillingFields = requiredBillingFields.filter(
      field => !userInfoBilling[field]
    );
    
    // If any required fields are missing, prevent the transaction
    if (missingShippingFields.length > 0 || missingBillingFields.length > 0) {
      let errorMessage = "Cannot proceed with payment. Please fill in all required information:\n";
      
      if (missingShippingFields.length > 0) {
        errorMessage += `- Shipping information: ${missingShippingFields.join(', ')}\n`;
      }
      
      if (missingBillingFields.length > 0) {
        errorMessage += `- Billing information: ${missingBillingFields.join(', ')}`;
      }
      
      alert(errorMessage);
      return; // Stop execution and prevent payment initiation
    }
    
    // Check if cart is empty
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }
    
    // All validation passed, proceed with payment
    setLoading(true);
  
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
  
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }
  
    try {
      const result = await makeRequestWithToken('/verifiedUsers/payment', 'POST', { 
        amount: total, 
        email: userInfo.email 
      });
  
      if (!result) {
        alert("Server error. Are you online?");
        setLoading(false);
        return;
      }
  
      const { amount, id: order_id, currency } = result.data;
  
      const options = {
        key: "", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: userInfo.name,
        description: "Test Transaction",
        image: "",
        order_id: order_id,
  
        handler: async function (response) {
          const data = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            email: userInfo.email,
            userInfoBilling: userInfoBilling
          };
  
          try {
            const result = await makeRequestWithToken('/verifiedUsers/verify-payment', 'POST', data);
  
            if (result.status === 200) {
              setLoading(false);
              alert("Payment successful");
              localStorage.setItem("selectedMenuItem", "Orders");
              navigate("/profile#", { replace: true });
            } else {
              setLoading(false);
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            setLoading(false);
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please try again later.");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        notes: {
          address: userInfo.streetAddress + userInfo.region + userInfo.city + userInfo.country + userInfo.postalCode,
        },
        theme: {
          color: "#61dafb",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  
      // Handle payment failure
      paymentObject.on('payment.failed', function (response) {
        setLoading(false);
        alert("Payment failed. Please try again later.");
      });
    } catch (error) {
      setLoading(false);
      console.error("Error creating payment order:", error);
      alert("Failed to create payment. Please try again later.");
    }
  }


  return (
    <div className="font-[Kumbh Sans] md:mt-16 w-full" style={{

      backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",

    }} >
      <div className="max-lg:max-w-xl mx-auto w-full" >
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full" >

            <div className="text-center max-lg:hidden">
              <h2 className="text-4xl  text-[#333] inline-block  pb-1">Checkout</h2>
            </div>

            <div className="lg:mt-12" >

              <div>
                <h2 className="text-2xl ">Shipping info</h2>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userInfo.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userInfo.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    value={userInfo.email}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    onChange={handleChange}
                    value={userInfo.phone}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="text"
                    placeholder="Street address"
                    name="streetAddress"
                    onChange={handleChange}
                    value={userInfo.streetAddress}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleChange}
                    value={userInfo.city}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="region"
                    onChange={handleChange}
                    value={userInfo.region}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="number"
                    placeholder="Postal code"
                    name="postalCode"
                    onChange={handleChange}
                    value={userInfo.postalCode}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  /></div>
              </div>

              <div>
                <h2 className="text-2xl mt-8">Billing info</h2>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleBillingChange}
                    value={userInfoBilling.firstName}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleBillingChange}
                    value={userInfoBilling.lastName}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    name="streetAddress"
                    type="text"
                    placeholder="Street address"
                    onChange={handleBillingChange}
                    value={userInfoBilling.streetAddress}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleBillingChange}
                    value={userInfoBilling.city}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="region"
                    onChange={handleBillingChange}
                    value={userInfoBilling.region}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="number"
                    placeholder="Postal code"
                    name="postalCode"
                    onChange={handleBillingChange}
                    value={userInfoBilling.postalCode}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  /></div>
              </div>

            </div>

            <div className="mt-12">
              <h2 className="text-2xl ">Payment method</h2>
              <div className="grid gap-4 sm:grid-cols-2 mt-8">
                <div className="flex items-center">
                  <input type="radio" className="w-5 h-5 cursor-pointer" id="card" defaultChecked />
                  <label for="razorpay" className="ml-4 flex gap-2 cursor-pointer">
                    <img src="https://akurateco.com/wp-content/uploads/2023/07/logo-razorpay.png" className="w-22 h-16" alt="razorpay" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <button type="button" className="min-w-[150px] px-6 py-3.5 font-medium text-md bg-gray-100 text-[#333] rounded-md hover:bg-gray-200">Back</button>
              <button type="button" onClick={displayRazorpay} className="min-w-[150px] px-6 py-3.5 font-medium text-md bg-[#333] text-white rounded-md hover:bg-[#111]"> {loading ? "Processing..." : `Confirm payment ${formatIndianCurrency(total)}`}</button>
            </div>

          </div>

          <div className=" lg:h-screen lg:sticky lg:top-0 bg-stone-100 shadow-2" style={{ backgroundImage: 'linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);' }}>
            <div className="relative h-full" >
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8" id="style-2">
                <h2 className="text-2xl ">Order Summary</h2>
                <div className="space-y-6 mt-10 ">
                  {cartItems.map((item, index) => (
                    <div key={index} className="grid sm:grid-cols-2 items-start gap-2">
                      <div className="max-w-[170px] shrink-0 bg-gray-200 rounded-md">
                        <img src={cartItems && cartItems[index].images[0]} className="w-full object-contain" alt={item.name} />
                      </div>
                      <div>
                        <h3 className="text-base text-[#333] font-bold mt-5">{item.name}</h3>
                        <ul className="text-sm tracking-wide text-[#333] space-y-2 mt-2">
                          <li className="flex flex-wrap gap-4 font-sm truncate">
                            <span className="ml-auto">{item.description}</span>
                          </li>
                          <li className="text-base flex flex-wrap gap-4 font-bold">
                            <span className="">{formatIndianCurrency(item.price)}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}



                </div>
              </div>
              <div className="absolute left-0 bottom-0 bg-[#333] w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-white font-bold">Total <span className="ml-auto">{formatIndianCurrency(total)}</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
