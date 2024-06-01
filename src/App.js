
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import Header from './Component/Header/Header.jsx';
import Footer from './Component/Footer/Footer';
import MainPage from './Component/MainPage/MainPage';
import ProfilePage from './Component/ProfilePage/ProfilePage.jsx';
import Cart from './Component/Checkout/Cart/Cart.jsx';
import ShoppingGrid from './Component/MainPage/Shop.jsx';
import ProductProfile from './Component/MainPage/ProductProfile.jsx';
import Checkout from './Component/Checkout/Cart/Checkout.jsx';
import WishList from './Component/ProfilePage/Wishlist.jsx'
import Contact from './Component/MainPage/Contact.jsx';
import Login from './Component/Registration/Login.jsx';
import SignUp from './Component/Registration/SignUp.jsx';
import EmailVerification from './Component/Registration/EmailVerification.jsx';
import ForgotPassword from './Component/Registration/ForgotPassword.jsx';
import ResetPassoword from './Component/Registration/ResetPassword.jsx';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './Component/slices/authSlice.js';


function App() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();

  }, [])

  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/profile';
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
       {!hideHeaderFooter && <Header />}
      <div className='flex flex-col justify-center items-center min-h-screen '>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/email-verify" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassoword />} />
          <Route path="/shop" element={<ShoppingGrid />} />
          <Route path="/product-detail/:id" element={<ProductProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={ isAuthenticated ? <ProfilePage/> : <Login/> }/>
          <Route path="/wishlist" element={<WishList/>}/>
          <Route path="/contact-us" element={<Contact/>}/>

        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}

    </div>
    
  );
}

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
