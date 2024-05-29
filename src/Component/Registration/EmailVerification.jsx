import React, { useState } from 'react';

const EmailVerification = () => {
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = () => {
    // Handle OTP verification
  };

  const handleOtpSend = () => {
    // Handle OTP verification
  };

  return (
    <div className="w-full max-w-sm mx-auto my-5 bg-white border rounded-lg">
        <h2 className="text-xl p-2 border-b bg-lightGray text-center mb-3">Email Verification</h2>
      
      <div className="px-5">
        <p className="text-center mb-5">Please enter the verification code we sent to your email address.</p>
        <form>
          <div className="mb-3">
            <label htmlFor="code" className="block mb-1 text-gray-700">Verification Code</label>
            <input
              id="code"
              type="text"
              placeholder="123456"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-transparent focus:ring-2 focus:ring-gray-300"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              className="w-full bg-customBrown text-white py-2 rounded-md mb-2 transition duration-300 ease-in-out "
              onClick={handleVerifyOTP}
            >
              Verify Email
            </button>
            <span className='mb-2 underline text-sm text-gray-500 cursor-pointer' onClick={handleOtpSend}>
              Resend Code
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
