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
  const response = await Axios.put(`${BASE_URL}/member/update`, userData);
  return response.data.data;
};

export const getonMyFeed = async (): Promise<unknown | undefined> => {
  const response = await Axios.get(`${BASE_URL}/feed/search/my-parent-feed`);
  return response.data.data;
};

export const getonMyScrap = async (): Promise<unknown | undefined> => {
  const response = await Axios.get(`${BASE_URL}/feed/search/bookmarked`);
  return response.data.data;
};

export const getOnMyData = async (): Promise<User> => {
  const response = await Axios.get(`${BASE_URL}/member/search/my-info`);
  return response.data.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postLogOut = async (): Promise<any> => {
  await Axios.post(`${BASE_URL}/logout`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postWithDraw = async (): Promise<any> => {
  await Axios.post(`${BASE_URL}/member/delete
  `);
};

export const getUserData = async (userId: string): Promise<User> => {
  const response = await Axios.get(`${BASE_URL}/member/search/member-info?member-id=${userId}`);
  return response.data.data;
};
