import { useEffect, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './Component/slices/authSlice.js';
import LoadingSpinner from './Component/LoadingSpinner.jsx';

// Lazy-loaded components
const Header = React.lazy(() => import('./Component/Header/Header.jsx'));
const Footer = React.lazy(() => import('./Component/Footer/Footer'));
const MainPage = React.lazy(() => import('./Component/MainPage/MainPage'));
const ProfilePage = React.lazy(() => import('./Component/ProfilePage/ProfilePage.jsx'));
const Cart = React.lazy(() => import('./Component/Checkout/Cart/Cart.jsx'));
const ShoppingGrid = React.lazy(() => import('./Component/MainPage/Shop.jsx'));
const ProductProfile = React.lazy(() => import('./Component/MainPage/ProductProfile.jsx'));
const Checkout = React.lazy(() => import('./Component/Checkout/Cart/Checkout.jsx'));
const WishList = React.lazy(() => import('./Component/ProfilePage/Wishlist.jsx'));
const Orders = React.lazy(() => import('./Component/ProfilePage/Orders.jsx'));
const Contact = React.lazy(() => import('./Component/MainPage/Contact.jsx'));
const Login = React.lazy(() => import('./Component/Registration/Login.jsx'));
const SignUp = React.lazy(() => import('./Component/Registration/SignUp.jsx'));
const EmailVerification = React.lazy(() => import('./Component/Registration/EmailVerification.jsx'));
const ForgotPassword = React.lazy(() => import('./Component/Registration/ForgotPassword.jsx'));
const ResetPassword = React.lazy(() => import('./Component/Registration/ResetPassword.jsx'));



function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/profile';
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        {!hideHeaderFooter && <Header />}
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/email-verify" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/shop" element={<ShoppingGrid />} />
            <Route path="/product-detail/:id" element={<ProductProfile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login />} />
            <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Login />} />
            <Route path="/wishlist" element={isAuthenticated ? <WishList /> : <Login />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/orders" element={isAuthenticated ? <Orders /> : <Login />} />
          </Routes>
        </div>
        {!hideHeaderFooter && <Footer />}
      </Suspense>
    </div>
  );
}

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
