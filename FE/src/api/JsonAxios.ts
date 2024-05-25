import baseAxios from "axios";

export const baseURL = import.meta.env.VITE_BASE_API_URL;

const Axios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
    // 임시 토큰: 임시 토큰 입력하고 사용.
    Authorization: "",
  },
});

export default Axios;
