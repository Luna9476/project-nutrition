import axios, { AxiosRequestConfig } from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:8080/api/";

const axiosWithHeader = axios.create({
    headers: authHeader()
});


export const getAllergies = () => {
    return axiosWithHeader.get(API_URL + 'allergies');
}

export const getBreakfasts = (calories: number, isVegi: boolean) => {
    return axiosWithHeader.get(API_URL + 'foods?type=breakfast&calories=' + calories + '&isVegi=' + isVegi);
}


export const getLunches = (calories: number, isVegi: boolean) => {
    return axiosWithHeader.get(API_URL + 'foods?type=lunch&calories=' + calories + '&isVegi=' + isVegi);
}

export const getDinners = (calories: number, isVegi: boolean) => {
    return axiosWithHeader.get(API_URL + 'foods?type=dinner&calories=' + calories + '&isVegi=' + isVegi);
}