import Axios from "./JsonAxios";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const updateUserData = async (userData: unknown): Promise<unknown> => {
  try {
    const response = await Axios.put(`${BASE_URL}/member/update`, userData);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const getonMyFeed = async (): Promise<unknown> => {
  try {
    const response = await Axios.get(`${BASE_URL}/feed/search/my-parent-feed`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log("내가 작성한 피드 가져오기 오류");
  }
};

export const getonMyScrap = async (): Promise<unknown> => {
  try {
    const response = await Axios.get(`${BASE_URL}/feed/search/bookmarked`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log("내 스크랩 가져오기 실패");
  }
};

export const getOnMyData = async (): Promise<unknown> => {
  try {
    const response = await Axios.get(`${BASE_URL}/member/search/my-info`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log("내정보 가져오기 실패");
  }
};
