import baseAxios, { AxiosError, AxiosResponse } from "axios";

export const baseURL = import.meta.env.VITE_BASE_API_URL;

const Axios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const res = error.response as AxiosResponse;
    const { status } = res;
    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default Axios;
