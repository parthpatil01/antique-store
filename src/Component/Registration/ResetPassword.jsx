
const ResetPassoword = () => {

    const handlePasswordChange = () =>{

    }

    return (
        <div className="w-full max-w-sm mx-auto my-5 bg-white border rounded-lg">
            <h2 className="text-xl p-2 border-b bg-lightGray text-center mb-3">Change Password</h2>

            <div className="px-5">
                <p className="text-center text-sm mb-5 ">Password should be 8 characters long and include 1 capital letter, 1 special character and 1 number.</p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="code" className="block mb-1 text-gray-700">New Password</label>
                        <input
                            id="code"
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-transparent focus:ring-2 focus:ring-gray-300"
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="code" className="block mb-1 text-gray-700">Confirm Password</label>
                        <input
                            id="code"
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-transparent focus:ring-2 focus:ring-gray-300"
                            />
                    </div>
                    <div className="text-center pb-2">
                        <button
                            type="button"
                            className="w-full font-semibold bg-customBrown text-white py-2 rounded-md mb-2 transition duration-300 ease-in-out"
                            onClick={handlePasswordChange}
                        >
                            Change Password
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );

}

export default ResetPassoword;