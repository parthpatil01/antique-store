import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../Assets/logo.png'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9+_.-]{4,}@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]{2,5}$/;
    const passwordRegex = /[\w@#$%&*()_]{7,20}/;

    const validate = () => {
        const newErrors = {};

        if (firstName.length < 2) {
            newErrors.firstName = 'First name should be atleast 2 characters long.';
        }

        if (lastName.length < 2) {
            newErrors.lastName = 'Last name should be atleast 2 characters long.';
        }

        if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be 7-20 characters and include only letters, numbers, and special characters @#$%&*()_';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); 

        console.log('clicked sign up')
        if (validate()) {

            const formData = {
                email,
                password,
                firstName,
                lastName
            };

            axios.post(`${process.env.REACT_APP_API_URL}/users/register`, formData)
                .then(response => {
                    console.log('Success:', response.data);
                    setLoading(false);
                    navigate('/log-in', { replace: true });
                })
                .catch(error => {
                    console.error('Error:', error);
                    const apiError = error.response.data.error || 'An error occurred. Please try again.';
                    setErrors(prevErrors => ({ ...prevErrors, api: apiError }));
                    setLoading(false);
                });
            
           } else {
            console.log('Form is invalid');
        }
    };

    return (
        <div className="lg:my-18 md:mt-20">
            <div className="flex justify-center">
                <div className="lg:w-[30vw] md:w-[40vw] w-[90vw] mb-10 bg-[#f9f5eb] rounded-l-md p-6 flex flex-col">
                    <div className="text-center">
                        <img
                            src={logo}
                            alt="logo"
                            className="mt-3 h-24 mx-auto"
                        />
                        <h4 className="mt-2 mb-5 pb-1 text-xl font-semibold">We are The Antique Team</h4>
                    </div>
                    <p className='text-sm text-center mt-4 mb-4'>Create your account</p>

                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}

                    <input
                        type="text"
                        placeholder="First Name"
                        className="mb-4 p-2 border-gray-300 rounded-md text-sm focus:border-transparent focus:ring-2 focus:ring-gray-300"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}

                    <input
                        type="text"
                        placeholder="Last Name"
                        className="mb-4 p-2 border-gray-300 rounded-md text-sm focus:border-transparent focus:ring-2 focus:ring-gray-300"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />


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
                    {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="mb-4 p-2 border-gray-300 rounded-md text-sm focus:border-transparent focus:ring-2 focus:ring-gray-300"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.api && <p className="text-red-500 text-xs">{errors.api}</p>}
                    <div className="text-center pt-1 mb-3 pb-1 flex flex-col items-center">
                        <button
                            className="w-3/5 font-bold h-10 text-customBrown bg-lightBrown transition duration-300 ease-in-out transform hover:bg-customBrown hover:text-white rounded"
                            onClick={handleSubmit}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Signing up...' : 'Sign up'}
                        </button>
                    </div>
                    <div className="flex flex-row items-center justify-center pb-4 mb-4 mt-2">
                        <p>Already have an account?</p>
                        <Link
                            to="#"
                            className="ml-2 font-bold text-sm text-customBrown"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/log-in', { replace: true });
                            }}
                        >
                            Log in
                        </Link>
                    </div>
                </div>
                <div
                    className="lg:w-[25vw] md:w-[40vw] hidden md:block mb-10 bg-cover bg-gray-100 bg-center rounded-r-md"
                    style={{
                        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/antique-store-78cdf.appspot.com/o/gautam-buddha-vintage-statue-fze8afr11o6ttj43.webp?alt=media&token=c9a17f07-7ce6-4a2b-bf83-352f79d790c7")`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default SignUp;
