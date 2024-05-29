import React,{useState} from 'react';
import logo from '../Assets/logo.png';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send the plaintext password to the server
      const response = await axios.post('https://antique-store-backend.vercel.app/api/users/login', {
        email,
        password,
      });
      
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };

  return (
   
      <div className="lg:my-18 md:mt-20">
        <div className="flex justify-center">
          <div className="lg:w-[30vw] md:w-[40vw] w-[90vw] mb-10 bg-[#f9f5eb] rounded-l-md p-6 flex flex-col">
            <div className="text-center">
              <img src='https://theantiquestory.com/cdn/shop/files/theantiquestory.com_indian_antiques_online_antiques_110x.png?v=1613692414' alt="logo" className="mt-3 h-24 mx-auto" />
              <h4 className="mt-2 mb-5 pb-1 text-xl font-semibold">We are The Antique Team</h4>
            </div>
            <p className='text-sm text-center mt-4' >Please login to your account</p>
            <input
              type="email"
              placeholder="Email address"
              className="mb-4 mt-4 p-2 border-gray-300 rounded-md text-sm focus:border-transparent focus:ring-2 focus:ring-gray-300 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 p-2 border-gray-300 rounded-md text-sm focus:border-transparent focus:ring-2 focus:ring-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-center pt-1 mb-3 pb-1 flex flex-col items-center">
              <button
                className="w-3/5  font-bold h-10 text-customBrown bg-lightBrown transition  duration-300 ease-in-out transform  hover:bg-customBrown hover:text-white rounded "
                onClick={handleSubmit}
              >
                Log In
              </button>
              <div className="text-center pt-1 mb-5 pb-1 text-xs underline mt-4">
                <Link className="text-gray-500" to="/forgot-password">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center pb-4 mb-4">
              <p >Don't have an account?</p>
              <Link
                to="#"
                className="ml-2 font-bold text-sm text-customBrown"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/sign-up', { replace: true });
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div
            className="lg:w-[25vw] md:w-[40vw] hidden md:block mb-10 bg-cover bg-center rounded-r-md"
            style={{
              backgroundImage: `url("https://wallpapers.com/images/high/gautam-buddha-vintage-statue-fze8afr11o6ttj43.webp")`,
            }}
          >
            
          </div>
        </div>
      </div>
    
  
  );
}

export default Login;