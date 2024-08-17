import axios from "axios";
import Cookies from 'js-cookie';
import { authURL } from "./baseURL";
import { logout } from "../redux/slice/auth.slice";


const axiosInstance = axios.create({
    baseURL: authURL,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(authURL + 'users/generateNewTokens', {}, { withCredentials: true })
                
                console.log("axiosInstance generateNewTokens", response);
                
                if (response.status === 200) {
                    const { accessToken } = response.data;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                const { store } = require('../redux/store').configureStore();
                const _id = localStorage.getItem("_id");
                store.dispatch(logout(_id));
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;