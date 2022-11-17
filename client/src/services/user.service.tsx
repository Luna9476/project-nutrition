import axios, { AxiosRequestConfig } from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:5000/api/";

const axiosWithHeader = axios.create({
    headers: authHeader()
});
export const getUserProfile = () => {
    return axiosWithHeader.get(API_URL + "profile")
}

export const getUserAvatar = () => {
    return axiosWithHeader.get(API_URL + "avatar",
        { responseType: 'blob' }
    );
}

export const updateUserAvatar = (formData: FormData) => {
    axiosWithHeader.interceptors.request.use((config: AxiosRequestConfig) => {
        if (config.headers) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    })
    return axiosWithHeader.post(API_URL + "avatar", formData)
        .then(res => console.log('success'));
}