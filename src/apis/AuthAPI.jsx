import axios from "axios";

let ACCESS_TOKEN = getCookie("access");
let REFRESH_TOKEN = getCookie("refresh");

// 로그인, 회원가입 시 사용
export const LoginAPI = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthAPI = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
  },
});

/** CreateNickname API */
export const createNickname = async ({
  nickname,
  profile,
  region,
  region_detail,
}) => {
  const data = { nickname, profile, region, region_detail };
  const response = await AuthAPI.patch(`/api/users/register/`, data);
  return response.data;
};

/** SIGNUP API */
export const signUp = async ({ email, password, password2 }) => {
  const data = { email, password, password2 };
  const response = await LoginAPI.post(`/api/users/register/`, data);
  return response.data;
};

/** LOGIN API */
export const login = async ({ email, password }) => {
  const data = { email, password };
  const response = await LoginAPI.post(`/api/users/auth/`, data);
  return response.data;
};

function getCookie(key) {
  let result = null;
  let cookie = document.cookie.split(";");
  cookie.some(function (item) {
    item = item.replace(" ", "");

    let dic = item.split("=");
    if (key === dic[0]) {
      result = dic[1];
      return true;
    }
  });
  return result;
}
