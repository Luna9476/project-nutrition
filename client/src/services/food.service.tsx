import axios, { AxiosRequestConfig } from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:8080/api/";

const axiosWithHeader = axios.create({
    headers: authHeader()
});

export const getImage = (url: String) => {
    axiosWithHeader.get(API_URL + 'image/url=' + url);
}