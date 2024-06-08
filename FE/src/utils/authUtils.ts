export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};


export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};