import axios from 'axios';

const API_URL = "http://127.0.0.1:8080/api/auth/";

export const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "register", {
        username,
        email,
        password
    });
}

export const login = (email: string, password: string) => {
    return axios.post(API_URL + "login", {
        email,
        password
    }).then((response: any) => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.token));
            return response.data;
        }
    });
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        return JSON.parse(userStr);
    } else {
        return null;
    }
}