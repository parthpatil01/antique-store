
import React,{useState,useEffect} from "react";
import axios from "axios";
import logo from '../../Assets/logo.png'

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
    cart:[]
  });

  useEffect(() => {
    // Fetch user information from the server
    fetchUserInfoFromServer()
      .then((data) => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          ...data // Merge fetched data with existing user information
        }));
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });
  }, []);

  const fetchUserInfoFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users"); // Replace '/api/userinfo' with your actual endpoint
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user information:', error);
      throw new Error('Failed to fetch user information');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };

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
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const result = await axios.post("https://antique-store-backend.vercel.app/api/users/payment",{
      amount: 1000, // Dynamically set the amount here (e.g., 50000 for INR 500.00)
  });

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "somya dey",
        description: "Test Transaction",
        image: "",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            // const result = await axios.post("http://localhost:5000/api/users/payment-success", data);

            alert("Payment successful");
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}


  return (
    <div className="font-[Kumbh Sans] md:mt-16 w-full" style={{
      
      backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
      
    }} >
      <div className="max-lg:max-w-xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
            <div className="text-center max-lg:hidden">
              <h2 className="text-4xl  text-[#333] inline-block  pb-1">Checkout</h2>
            </div>
            <form className="lg:mt-12">
              <div>
                <h2 className="text-2xl ">Shipping info</h2>
                <div className="grid grid-cols-2 gap-6 mt-8">
                <input
                type="text"
                placeholder="Last Name"
                value={userInfo.firstName}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
                <input
                type="text"
                placeholder="Last Name"
                value={userInfo.lastName}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <input
                type="email"
                placeholder="Email address"
                value={userInfo.email}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <input
                type="text"
                placeholder="Phone"
                value={userInfo.phone}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <input
                type="text"
                placeholder="Street address"
                value={userInfo.streetAddress}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <input
                type="text"
                placeholder="City"
                value={userInfo.city}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <input
                type="text"
                placeholder="State"
                value={userInfo.region}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <input
                type="number"
                placeholder="Postal code"
                value={userInfo.postalCode}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              /></div>
              </div>
              <div className="mt-12">
                <h2 className="text-2xl ">Payment method</h2>
                <div className="grid gap-4 sm:grid-cols-2 mt-8">
                  <div className="flex items-center">
                    <input type="radio" className="w-5 h-5 cursor-pointer" id="card" checked />
                    <label for="razorpay" className="ml-4 flex gap-2 cursor-pointer">
                      <img src="https://akurateco.com/wp-content/uploads/2023/07/logo-razorpay.png" className="w-22 h-16" alt="razorpay" />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                    <label for="paypal" className="ml-4 flex gap-2 cursor-pointer">
                      <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                    </label>
                  </div>
                </div>

              </div>
              <div className="flex flex-wrap gap-4 mt-10">
                <button type="button" className="min-w-[150px] px-6 py-3.5 font-medium text-md bg-gray-100 text-[#333] rounded-md hover:bg-gray-200">Back</button>
                <button type="button" onClick={displayRazorpay} className="min-w-[150px] px-6 py-3.5 font-medium text-md bg-[#333] text-white rounded-md hover:bg-[#111]">Confirm payment $240</button>
              </div>
            </form>
          </div>
          <div className=" lg:h-screen lg:sticky lg:top-0 bg-stone-100 shadow-2" style={{backgroundImage: 'linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);'}}>
            <div className="relative h-full">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 className="text-2xl ">Order Summary</h2>
                <div className="space-y-6 mt-10 ">
                  
                  
                {userInfo.cart.map((item, index) => (
                    <div key={index} className="grid sm:grid-cols-2 items-start gap-6">
                      <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                        <img src="https://readymadeui.com/images/product10.webp" className="w-full object-contain" alt={item.name} />
                      </div>
                      <div>
                        <h3 className="text-base text-[#333] font-medium">{item.name}</h3>
                        <ul className="text-sm tracking-wide text-[#333] space-y-2 mt-2">
                          <li className="flex flex-wrap gap-4">
                            Size <span className="ml-auto">{item.size}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Quantity <span className="ml-auto">{item.quantity}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Total Price <span className="ml-auto">{item.totalPrice}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                  
                
                 
                </div>
              </div>
              <div className="absolute left-0 bottom-0 bg-[#333] w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-white font-bold">Total <span className="ml-auto">$240.00</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

/*

card holder detail
<div className="grid gap-6 mt-8">
  <input type="text" placeholder="Cardholder's Name"
    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
  <div className="flex bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  w-full overflow-hidden">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 ml-3" viewBox="0 0 291.764 291.764">
      <path fill="#2394bc" d="m119.259 100.23-14.643 91.122h23.405l14.634-91.122h-23.396zm70.598 37.118c-8.179-4.039-13.193-6.765-13.193-10.896.1-3.756 4.24-7.604 13.485-7.604 7.604-.191 13.193 1.596 17.433 3.374l2.124.948 3.182-19.065c-4.623-1.787-11.953-3.756-21.007-3.756-23.113 0-39.388 12.017-39.489 29.204-.191 12.683 11.652 19.721 20.515 23.943 9.054 4.331 12.136 7.139 12.136 10.987-.1 5.908-7.321 8.634-14.059 8.634-9.336 0-14.351-1.404-21.964-4.696l-3.082-1.404-3.273 19.813c5.498 2.444 15.609 4.595 26.104 4.705 24.563 0 40.546-11.835 40.747-30.152.08-10.048-6.165-17.744-19.659-24.035zm83.034-36.836h-18.108c-5.58 0-9.82 1.605-12.236 7.331l-34.766 83.509h24.563l6.765-18.08h27.481l3.51 18.153h21.664l-18.873-90.913zm-26.97 54.514c.474.046 9.428-29.514 9.428-29.514l7.13 29.514h-16.558zM85.059 100.23l-22.931 61.909-2.498-12.209c-4.24-14.087-17.533-29.395-32.368-36.999l20.998 78.33h24.764l36.799-91.021H85.059v-.01z" data-original="#2394bc" />
      <path fill="#efc75e" d="M51.916 111.982c-1.787-6.948-7.486-11.634-15.226-11.734H.374L0 101.934c28.329 6.984 52.107 28.474 59.821 48.688l-7.905-38.64z" data-original="#efc75e" />
    </svg>
    <input type="number" placeholder="Card Number"
      className="border border-0 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-transparent focus:border-transparent" />
  </div>
  <div className="grid grid-cols-2 gap-6">
    <input type="number" placeholder="EXP."
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
    <input type="number" placeholder="CVV"
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
  </div>
  <div className="flex items-center">
    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
    <label for="remember-me" className="ml-3 block text-sm">
      I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
    </label>
  </div>
</div>
*/