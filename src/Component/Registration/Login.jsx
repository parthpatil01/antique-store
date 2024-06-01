import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectLoading, selectIsAuthenticated, selectError } from '../slices/authSlice';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const loginError = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const currentUrl = location.pathname;

  const emailRegex = /^[a-zA-Z0-9+_.-]{4,}@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]{2,5}$/;
  const passwordRegex = /[\w@#$%&*()_]{7,20}/;

  console.log(currentUrl);

  const validate = () => {
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be 7-20 characters and include only letters, numbers, and special characters @#$%&*()_';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginAsync({ email, password }));

    } else {
      console.log('Form is invalid');
    }
  };

  useEffect(()=>{
    if (isAuthenticated) {
      navigate('/',{replace:true});
    }
  },[isAuthenticated])

  

  return (
    <div className="lg:my-18 md:mt-20">
      <div className="flex justify-center">
        <div className="lg:w-[30vw] md:w-[40vw] w-[90vw] mb-10 bg-[#f9f5eb] rounded-l-md p-6 flex flex-col">
          <div className="text-center">
            <img src='https://theantiquestory.com/cdn/shop/files/theantiquestory.com_indian_antiques_online_antiques_110x.png?v=1613692414' alt="logo" className="mt-3 h-24 mx-auto" />
            <h4 className="mt-2 mb-5 pb-1 text-xl font-semibold">We are The Antique Team</h4>
          </div>
          <p className='text-sm text-center mt-4 mb-4'>Please login to your account</p>

          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <input
            type="email"
            placeholder="Email address"
            className="mb-4 p-2 border-gray-300 rounded-md text-sm focus:border-transparent focus:ring-2 focus:ring-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 border-gray-300 rounded-md text-sm focus:border-transparent focus:ring-2 focus:ring-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
          <div className="text-center pt-1 mb-3 pb-1 flex flex-col items-center">
            <button
              className="w-3/5 font-bold h-10 text-customBrown bg-lightBrown transition duration-300 ease-in-out transform hover:bg-customBrown hover:text-white rounded"
              onClick={handleSubmit}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            <div className="text-center pt-1 mb-5 pb-1 text-xs underline mt-4">
              <Link className="text-gray-500" to="/forgot-password">
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center pb-4 mb-4">
            <p>Don't have an account?</p>
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
          className="lg:w-[25vw] md:w-[40vw] hidden md:block mb-10 bg-cover bg-center bg-gray-100 rounded-r-md"
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/antique-store-78cdf.appspot.com/o/gautam-buddha-vintage-statue-fze8afr11o6ttj43.webp?alt=media&token=c9a17f07-7ce6-4a2b-bf83-352f79d790c7")`,
          }}
        >
        </div>
      </div>
    </div>
  );
}

export default Login;
