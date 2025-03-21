import axios from 'axios';

// Function to make a request with the token
const makeRequestWithToken = async (url, method, data = null) => {
  try {
    const token = localStorage.getItem('token');

    // Set up headers with the token
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
    };

    const baseURL =  process.env.REACT_APP_API_URL;
    // Make the request with Axios
    const response = await axios({
      method,
      url: `${baseURL}${url}`,
      data,
      headers,
    });

    return response;
  } catch (error) {
    // Handle errors
    
    
    if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
      console.error('Network error:', error);
    } else {
      console.error('Request error:', error);
      throw error; // Rethrow the error for handling in the caller
    }

  }
};

export default makeRequestWithToken;