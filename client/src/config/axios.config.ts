import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { appCookies } from '../utils/appCookies';

const defaultOptions: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: process.env.REACT_APP_API_URL,
};

const { removeCookie } = appCookies();

export const axiosInstance = axios.create(defaultOptions);

export const axiosInterceptorRequest = async (requestConfig: InternalAxiosRequestConfig) => {
  const access_token_cookie = Cookies.get('access_token') ?? localStorage.getItem('access_token');
  requestConfig.headers.Authorization = `Bearer ${access_token_cookie}`;
  return requestConfig;
};

export const axiosInterceptorResponseError = async (error: AxiosError) => {
  console.log('error axios', error)
  const status = error.response ? error.response.status : null;
  if (status === 403 || status === 401) {
    removeCookie({ name: 'access_token' });
    window.location.pathname = '/login';
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(axiosInterceptorRequest, (err) => err);
axiosInstance.interceptors.response.use((res) => res, axiosInterceptorResponseError);
