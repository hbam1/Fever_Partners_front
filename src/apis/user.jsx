import axios from "axios";
import {AuthAPI} from "./AuthAPI"

export const logout = () => {
    // 쿠키에 저장된 access_token 삭제
    document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // 쿠키에 저장된 refresh_token 삭제
    document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // 로그아웃 후에 다른 작업을 수행할 수 있습니다. 예를 들어, 로그인 페이지로 리디렉션할 수 있습니다.
    window.location.href = "/";        
}

export const userInfo = async () => {
    try {
        // AuthAPI.get()을 호출하고 응답을 기다림
        const response = await AuthAPI.get(`/api/users/auth/`);
        
        // 응답 데이터를 반환
        return response.data;
    } catch (error) {
        // 오류가 발생한 경우 처리
        console.error('Error fetching user info:', error);
        throw error; // 오류를 다시 throw하여 호출한 곳에서 처리할 수 있도록 함
    }
}