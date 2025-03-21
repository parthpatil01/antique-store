import React, { useState, useEffect } from "react";
import axios from "axios";
import './scroll.css'
import { useSelector } from "react-redux";
import { selectEmail } from "../../slices/authSlice";
import makeRequestWithToken from "../../../helper/makeRequestWithToken";
import { Link } from 'react-router-dom'
import formatIndianCurrency from "../../../helper/formatIndianCurrency";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const email = useSelector(selectEmail);
    const [wishlistButtonDisabled, setWishlistButtonDisabled] = useState(false);
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
    const [subtTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchProducts = async () => {
        try {
            makeRequestWithToken('/verifiedUsers/cart', 'POST', { email }).then(response => {
                if (response.data.cart) {
                    setCartItems(response.data.cart);
                }else setCartItems([]);
                setLoading(false);
            })
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
            setSubTotal(totalPrice);
            const calculatedTax = totalPrice * 0.15;
            setTax(calculatedTax);
            setTotal(totalPrice + calculatedTax + 500);
        } else {
            setSubTotal(0);
            setTax(0);
            setTotal(0);
        }
    }, [cartItems]);

    const handleWishlish = (e, id) => {
        e.preventDefault();
        setWishlistButtonDisabled(true);

        try {
            makeRequestWithToken('/verifiedUsers/add-to-wishlist', 'POST', { email, productId: id, location: 'cart' }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    deleteFromCart(e, id);
                }
                setWishlistButtonDisabled(false);
            })
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    const deleteFromCart = (e, id) => {
        e.preventDefault();
        setDeleteButtonDisabled(true);

        try {
            makeRequestWithToken('/verifiedUsers/add-to-cart', 'POST', { email, productId: id }).then(response => {
                if (response.status === 200) {
                    const list = cartItems.filter(product => product._id !== id);
                    setCartItems(list);
                }
                setDeleteButtonDisabled(false);
            })
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    if (loading) {
        return <div className='flex h-full w-scrren justify-center items-center'>Loading...</div>;
    }

    return (
        <div className="grid lg:grid-cols-3 gap-8 p-6 md:mt-16">
            <div className="lg:col-span-2 md:pe-8 bg-white overflow-x-auto h-[80vh]" id="style-1">
                {!loading && cartItems.length === 0 && (
                    <div className='flex items-center h-[50vh] justify-center'>No items found</div>
                )}
                {cartItems && cartItems.map((item) => (
                    <div key={item.id} className="rounded-lg border border-gray-200 p-4 lg:m-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                        <div className="col-span-12 lg:col-span-2 img box">
                            <img src={item.images[0]} alt="speaker image" className="max-lg:w-full lg:w-[180px] " />
                        </div>
                        <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                            <div className="flex items-center justify-between w-full mb-4">
                                <h5 className="font-manrope font-bold text-xl leading-9 text-gray-900">{item.name}</h5>
                                <button className="rounded-full group flex items-center justify-center hover:bg-gray-100 h-8 w-8 focus-within:outline-red-500" disabled={deleteButtonDisabled} onClick={(e) => deleteFromCart(e, item._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                        <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                                    </svg>
                                </button>
                            </div>
                            <p className="font-normal text-base leading-7 text-gray-500 mb-6 truncate">
                                {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="underline text-customBrown text-sm cursor-pointer" disabled={wishlistButtonDisabled} onClick={(e) => handleWishlish(e, item._id)}>move to wishlist</span>
                                </div>
                                <div className="flex flex-col md:flex-row">
                                    <span className="text-gray-600 ms-4 font-manrope font-bold text-base leading-9 text-right">{formatIndianCurrency(item.price)}</span></div>
                            </div>
                        </div>
                    </div>))
                }
            </div>
            <div className="left border rounded-md h-fit p-6 bg-white">
                <h3 className="text-xl text-[#333] font-bold border-b pb-4">Cart Summary</h3>
                <ul className="text-[#333] divide-y mt-6">
                    <li className="flex flex-wrap font-semibold gap-4 text-md py-4">Subtotal <span className="ml-auto font-bold">{formatIndianCurrency(subtTotal)}</span></li>
                    <li className="flex flex-wrap font-semibold gap-4 text-md py-4">Shipping <span className="ml-auto font-bold">₹{500}</span></li>
                    <li className="flex flex-wrap font-semibold gap-4 text-md py-4">Tax <span className="ml-auto font-bold">{formatIndianCurrency(tax)}</span></li>
                    <li className="flex flex-wrap font-semibold gap-4 text-md py-4 font-bold">Total <span className="ml-auto">{formatIndianCurrency(total)}</span></li>
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
                <Link
                    to={cartItems.length > 0 ? "/checkout" : "#"}>
                    <button type="button" className="mt-10 md:mb-8 text-md px-6 py-3 w-full font-bold bg-customBrown hover:bg-[#A94E2D] text-white rounded-md" disabled={cartItems.length === 0} >Check out</button>
                </Link>
            </div>
        </div>
    );
}

export default Cart;