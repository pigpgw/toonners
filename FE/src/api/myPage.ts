import Axios from "./JsonAxios";
import { FeedListConfig } from "@/interface/Feed.interface";
import { UserConfig } from "@/interface/Webtoon.interface";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const updateUserData = async (userData: unknown): Promise<UserConfig> => {
  const response = await Axios.put(`${BASE_URL}/member/update`, userData);
  return response.data.data;
};

export const checkValidNickname = async (userData: unknown): Promise<UserConfig> => {
  const response = await Axios.post(`${BASE_URL}/member/check/nickname`, userData);
  return response.data.data;
};

export const getonMyFeed = async (): Promise<FeedListConfig[]> => {
  const response = await Axios.get(`${BASE_URL}/feed/search/my-parent-feed`);
  return response.data.data;
};

export const getonMyScrap = async (): Promise<FeedListConfig[]> => {
  const response = await Axios.get(`${BASE_URL}/feed/search/bookmarked`);
  return response.data.data;
};

export const getOnMyData = async (): Promise<UserConfig> => {
  const response = await Axios.get(`${BASE_URL}/member/search/my-info`);
  return response.data.data;
};

export const postLogOut = async (): Promise<undefined> => {
  await Axios.post(`${BASE_URL}/logout2`);
};

export const postWithDraw = async (): Promise<undefined> => {
  await Axios.post(`${BASE_URL}/member/delete
  `);
};

export const getUserData = async (userId: string): Promise<UserConfig> => {
  const response = await Axios.get(`${BASE_URL}/member/search/member-info?member-id=${userId}`);
  return response.data.data;
};
