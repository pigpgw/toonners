import baseAxios from "axios";

export const baseURL = import.meta.env.VITE_BASE_API_URL;

const Axios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
    // 임시 토큰
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b3VyQGVtYWlsLmNvbSIsImlhdCI6MTcxNjYyNDgzNywiZXhwIjoxNzE2NjI4NDM3fQ.NXOtIA1n17Aemb26T475tB5YvzmWD_cK-ZdE18CAQ3JIuSsI9YlD8wUJIq0FdkY5AEjV6d4IKKB4PynuTjjeew",
  },
});

export default Axios;
