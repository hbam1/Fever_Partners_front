import { AuthAPI } from "../apis/AuthAPI";

export const goalList = async () => {
    try {
        // AuthAPI.get()을 호출하고 응답을 기다림
        const response = await AuthAPI.get(`/api/goals/`);
        
        // 응답 데이터를 반환
        return response.data;
    } catch (error) {
        // 오류가 발생한 경우 처리
        console.error('Error fetching goal list:', error);
        throw error; // 오류를 다시 throw하여 호출한 곳에서 처리할 수 있도록 함
    }
}