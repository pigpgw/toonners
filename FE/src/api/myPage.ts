import Axios from "./JsonAxios";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

type User = {
  id: number;
  email: string;
  nickname: string;
  description: string;
  image: string | null;
  favoriteToons: unknown[];
  watchingToons: unknown[];
};

export const updateUserData = async (userData: unknown): Promise<User> => {
  try {
    const response = await Axios.put(`${BASE_URL}/member/update`, userData);
    return response.data.data;
  } catch (error) {
    throw new Error("유저 정보 수정 실패");
  }
};

export const getonMyFeed = async (): Promise<unknown | undefined> => {
  try {
    const response = await Axios.get(`${BASE_URL}/feed/search/my-parent-feed`);
    return response.data.data;
  } catch (e) {
    throw new Error("내가 작성한 피드 가져오기 실패");
  }
};

export const getonMyScrap = async (): Promise<unknown | undefined> => {
  try {
    const response = await Axios.get(`${BASE_URL}/feed/search/bookmarked`);
    return response.data.data;
  } catch (e) {
    throw new Error("내 스크랩 가져오기 실패");
  }
};

export const getOnMyData = async (): Promise<User> => {
  try {
    const response = await Axios.get(`${BASE_URL}/member/search/my-info`);
    return response.data.data;
  } catch (e) {
    throw new Error("Failed to fetch user data");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postLogOut = async (): Promise<any> => {
  try {
    const response = await Axios.post(`${BASE_URL}/logout`);
    return response;
  } catch (e) {
    throw new Error("로그아웃 실패");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postWithDraw = async (): Promise<any> => {
  await Axios.post(`${BASE_URL}/member/delete
  `);
};

export const getUserData = async (userId: string): Promise<User> => {
  try {
    const response = await Axios.get(`${BASE_URL}/member/search/member-info?member-id=${userId}`);
    return response.data.data;
  } catch (e) {
    throw new Error("Failed to fetch user data");
  }
};
