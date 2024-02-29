import axios from "axios";

let ACCESS_TOKEN = getCookie("access");
let REFRESH_TOKEN = getCookie("refresh");
let CSRF_TOKEN = getCookie("csrftoken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthAPI = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'X-CSRFToken': CSRF_TOKEN,
    },
});

/** SIGNUP API */
export const signUp = async ({ email, password1, password2 }) => {
    const data = { email, password1, password2 };
    const response = await AuthApi.post(`/api/register/`, data);
    return response.data;
}

/** LOGIN API */
export const login = async ({ email, password }) => {
    const data = { email, password };
    const response = await AuthApi.post(`/api/auth/`, data);
    return response.data;
}

function getCookie(key) {
    let result = null;
    let cookie = document.cookie.split(';');
    cookie.some(function (item) {
        item = item.replace(' ', '');

        let dic = item.split('=');
        if (key === dic[0]) {
            result = dic[1];
            return true;
        }
    });
    return result;
}