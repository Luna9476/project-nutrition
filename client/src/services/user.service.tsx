import axios, { AxiosRequestConfig } from 'axios';
import { Dayjs } from 'dayjs';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:8080/api/";

const axiosWithHeader = axios.create({
    headers: authHeader()
});
export const getUserProfile = () => {
    return axiosWithHeader.get(API_URL + "profile")
}

export const updateUserProfile = (profileJson: { userName: string; gender: string; isVegi: boolean; birthdate: string | undefined; allergens: number[]; }) => {
    return axiosWithHeader.post(
        API_URL + "profile", profileJson
    )
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

export const udpateUserBodyRecord = (height: Number, weight: Number) => {
    return axiosWithHeader.post(
        API_URL + "record", {
            height: height,
            weight: weight
        }
    )
}

export const getUserLatestBodyRecord = () => {
    return axiosWithHeader.get(
        API_URL + "record"
    )
}

export const getUserBodyRecords = () => {
    return axiosWithHeader.get(
        API_URL + "records"
    )
}