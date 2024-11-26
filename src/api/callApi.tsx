import axios, { AxiosInstance } from "axios";
import { getCookie } from "../utils/getCookie";
import { delete_cookie } from "../utils/removeCookie";

// export const BASE_URL = "https://api.nexovpn.net";
export const BASE_URL = "https://localhost:7092";

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

export const postMethod = async (
  endpoint: string,
  body: FormData | object,
  newHeader?: object,
  controller?: AbortController
) => {
  const isFormData = body instanceof FormData;
  const axiosInstance = createAxiosInstance(controller, {
    ...newHeader,
    ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
  });

  try {
    const response = await axiosInstance.post(endpoint, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// متد GET
export const getMethod = async (
  endpoint: string,
  controller?: AbortController
) => {
  const axiosInstance = createAxiosInstance(controller);
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const getMethodGeneric = async <T,>(
  endpoint: string,
  controller?: AbortController
): Promise<T | undefined> => {
  const axiosInstance = createAxiosInstance(controller);
  try {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
    return undefined; // در صورت خطا، خروجی به صورت `undefined`
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
