import axiosInstance from './axiosInstance';

// login request
export const login = async (loginObj) => {
    try {
        const { data } = await axiosInstance.post('/login', loginObj);
        console.log('Login successful:', data);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// registration request
export const register = async (regObj) => {
    // console.log(regObj.name, regObj.email)
    try {
        const { data } = await axiosInstance.post('/register', regObj);
        console.log('Registration successful:', data);
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// car create request
// export const createCar = async () => {
//     try {
//         const { data } = await axiosInstance.post('/car');
//         console.log('car created successfully:', data);
//         return data;
//     } catch (error) {
//         console.error('car creation error:', error);
//         throw error;
//     }
// };

export const getRequest = async (endpoint) => {
    try {
      // Get the token from the local storage
      const token = localStorage.getItem("token");
      // Check if the token exists and is valid
      if (token) {
        // Set the authorization header with the token
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // Make the GET request and get the data from the response
        const { data } = await axiosInstance.get(endpoint);
        // Return the data
        return data;
      } else {
        // Throw an error if the token is missing or invalid
        // throw new Error("Token is missing or invalid");
        console.log('Missing token, you will be redirected to login')
      }
    } catch (error) {
      // Log the error and rethrow it
      console.error("getRequest error:", error);
      throw error;
    }
  };

  // A function to make a POST request to an endpoint with authorization and data
export const postRequest = async (endpoint, data) => {
    try {
      // Get the token from the local storage
      const token = localStorage.getItem("token");
      // Check if the token exists and is valid
      if (token) {
        // Set the authorization header with the token
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // Make the POST request and get the response
        const response = await axiosInstance.post(endpoint, data);
        // Return the response
        return response;
      } else {
        // Throw an error if the token is missing or invalid
        throw new Error("Token is missing or invalid");
      }
    } catch (error) {
      // Log the error and rethrow it
      console.error("postRequest error:", error);
      throw error;
    }
  };

  export const putRequest = async (endpoint, data) => {
    try {
      // Get the token from the local storage
      const token = localStorage.getItem("token");
      // Check if the token exists and is valid
      if (token) {
        // Set the authorization header with the token
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // Make the PUT request and get the response
        const response = await axiosInstance.put(endpoint, data);
        // Return the response
        return response;
      } else {
        // Throw an error if the token is missing or invalid
        throw new Error("Token is missing or invalid");
      }
    } catch (error) {
      // Log the error and rethrow it
      console.error("putRequest error:", error);
      throw error;
    }
  };

// A function to make a DELETE request to an endpoint with authorization
export const deleteRequest = async (endpoint) => {
    try {
      // Get the token from the local storage
      const token = localStorage.getItem("token");
      // Check if the token exists and is valid
      if (token) {
        // Set the authorization header with the token
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // Make the DELETE request and get the response
        const response = await axiosInstance.delete(endpoint);
        // Return the response
        return response;
      } else {
        // Throw an error if the token is missing or invalid
        throw new Error("Token is missing or invalid");
      }
    } catch (error) {
      // Log the error and rethrow it
      console.error("deleteRequest error:", error);
      throw error;
    }
  };
  