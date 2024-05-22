import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import WishList from "./Wishlist";
import wish from '../Assets/wishlist.svg'
import person from '../Assets/person.svg'
import order from '../Assets/order.svg'
import OrderHistory from "./Orders";



const ProfilePage = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };


    return (

        <div className="flex flex-col w-full md:flex-row flex-auto flex-shrink-0 antialiased text-gray-800" style={{

            backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",

        }}>

            <div className=" flex flex-col  md:w-64 bg-white md:h-screen md:border-r">

                <div className="flex flex-row items-center h-14 border-b md:font-bold">
                    <div className="px-5">Profile</div>
                    <button className="md:hidden absolute right-3" onClick={toggleNav}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className={`overflow-y-auto overflow-x-hidden flex-grow ${isNavOpen ? "" : "hidden md:block"}`}>
                    <ul className="flex flex-col py-4 space-y-1 ">
                        <li className="px-5">
                            <div className="flex flex-row items-center h-8 justify-center md:justify-start">
                                <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                            </div>
                        </li>
                        <li className="flex justify-center md:justify-start focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500">
                            <a href="#" className="relative flex flex-row items-center h-11 w-[150px] md:w-full  pr-2">
                                <span className="inline-flex justify-center items-center ml-4">
                                <img src={person} className="w-7 h-7 md:w-5 md:h-5" alt="" />

                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Personal Information</span>
                            </a>
                        </li>
                        <li className="flex justify-center md:justify-start focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500">
                            <a href="#" className="relative flex flex-row items-center h-11 w-[150px] md:w-full  pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                <img src={wish} className="w-5 h-5" alt="" />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">WishList</span>
                            </a>
                        </li>
                        <li className="flex justify-center md:justify-start focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500">
                            <a href="#" className="relative flex flex-row items-center h-11 w-[150px] md:w-full pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                            <img src={order} className="w-5 h-5" alt="" />
                            </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Orders</span>
                            </a>
                        </li>
                        <li className="flex justify-center md:justify-start focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500">
                            <a href="#" className="relative flex flex-row items-center h-11 w-[150px] md:w-full pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Notifications</span>
                            </a>
                        </li>

                        <li className="flex justify-center md:justify-start focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500">
                            <a href="#" className="relative flex flex-row items-center h-11 w-[150px] md:w-full pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-1 md:h-screen overflow-y-auto justify-center" ><WishList /></div>

        </div>
    );
};

export default ProfilePage;