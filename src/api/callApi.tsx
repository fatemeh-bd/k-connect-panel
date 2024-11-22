import axios, { AxiosInstance } from "axios";
import { getCookie } from "../utils/getCookie";
import { delete_cookie } from "../utils/removeCookie";

export const BASE_URL = "http://api.artdev.ir";

const getAccessToken = (): string => {
  const token = getCookie("access_token");
  return token ? `Bearer ${token}` : "";
};

//  axios تنظیمات مشترک
const createAxiosInstance = (
  controller?: AbortController,
  customHeaders?: object
): AxiosInstance => {
  const accessToken = getAccessToken();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: accessToken,
    ...customHeaders,
  };

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers,
    signal: controller?.signal,
  });

  // تنظیم interceptor برای مدیریت خطاهای توکن
  instance.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 ||
        (error.response?.status === 403 && !originalRequest._retry)
      ) {
        originalRequest._retry = true;
        delete_cookie("access_token");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// متد POST
export const postMethod = async (
  endpoint: string,
  body: object,
  newHeader?: object,
  controller?: AbortController
) => {
  const axiosInstance = createAxiosInstance(controller, newHeader);
  try {
    const response = await axiosInstance.post(endpoint, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// متد GET
export const getMethod = async <T,>(
  endpoint: string,
  controller?: AbortController
): Promise<T | undefined> => {
  const axiosInstance = createAxiosInstance(controller);
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// تابع مشترک برای مدیریت خطاها
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Server error:", error.response.status);
      console.error("Error data:", error.response.data);
    } else if (error.request) {
      console.error("Network error:", error.request);
    }
  } else {
    console.error("Unexpected error:", (error as Error).message);
  }
};
