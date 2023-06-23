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
export const createCar = async () => {
    try {
        const { data } = await axiosInstance.post('/car');
        console.log('car created successfully:', data);
        return data;
    } catch (error) {
        console.error('car creation error:', error);
        throw error;
    }
};

// network get request
export const getRequest = async (endpoint) => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data } = await axiosInstance.get(endpoint);
        return data;
    } catch (error) {
        console.error('getRequest error:', error);
        throw error;
    }
};
