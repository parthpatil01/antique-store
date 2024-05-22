
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


function App() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();

  }, [])

  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/profile';

  return (
    <div>
       {!hideHeaderFooter && <Header />}
      <div className='flex flex-col justify-center items-center min-h-screen '>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shop" element={<ShoppingGrid />} />
          <Route path="/product-detail/:id" element={<ProductProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage/>}/>
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
