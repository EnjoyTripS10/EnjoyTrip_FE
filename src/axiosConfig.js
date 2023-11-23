import axios from "axios";
import cookie from "@/utils/cookie.js";
import router from "./router";

const token = cookie.getCookie("accessToken");

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: import.meta.env.VITE_APP_API_TIMEOUT, // request timeout
  // withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// const token = cookie.getCookie("accessToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:17000", // 여기에 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// 필요한 경우 인터셉터 추가
service.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response.status === 401) {
      router.push("/"); // 401 Unauthorized 상태일 때 로그인 페이지로 리디렉트
    }

    //   if (error.response.status === 500) {
    //     router.push("/"); // 401 Unauthorized 상태일 때 로그인 페이지로 리디렉트
    //   }
    return Promise.reject(error);
  }
);
export default service;
//   export default axiosInstance;
// export default axios;
