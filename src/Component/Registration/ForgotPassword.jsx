import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send request to backend to initiate password reset using Axios
      const response = await axios.post('http://localhost:5000/api/users/reset-password', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        // Display success message to the user
        alert('Password reset link sent to your email!');
      } else {
        // Handle error response
        alert(response.data.message || 'Something went wrong!');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }
  };

 

  return (
    <div className="max-w-md mx-auto my-5   border rounded-lg ">
      <form onSubmit={handleSubmit} className='px-3 py-4'>
        <div className="text-center space-y-2 ">
          <div className="flex items-center justify-center">
            <KeyIcon className="w-6 h-6 text-gray-500" />
          </div>
          <h2 className="text-lg font-bold">Forgot Password</h2>
          <p>Enter your email below to reset your password securely.</p>
        </div>
        <div className="space-y-4 mt-8">
          <div className="space-y-2 text-center">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-transparent focus:outline-none focus:ring focus:ring-gray-300"
              id="email"
              placeholder="your.email@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="w-full mt-3 bg-customBrown text-white font-semibold py-2 rounded-md transition duration-300"
            type="submit"
          >Reset Password
          </button>
        </div>
      </form>
      <div className="flex justify-center bg-lightGray mt-4 p-4 border-t">
        <Link className="text-sm text-customBrown underline" onClick={(e)=>{navigate(-1)}}  to='#'>
          Back to Login
        </Link>
      </div>
    </div>
  );
}

function KeyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}
