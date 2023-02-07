import {TOKEN_KEY} from '../stores/AuthContext';
import {AxiosInstance} from 'axios';

const requestInterceptor = (axiosInstance: AxiosInstance) => {
	axiosInstance.interceptors.request.use(config => {
			const accessToken = window.localStorage.getItem(TOKEN_KEY);
			if (!config.headers) {
				config.headers = {};
			}
			if (accessToken) {
				config.headers['Authorization'] = 'Bearer ' + accessToken;
			}
			config.headers['Content-Type'] = 'application/json';
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);
};

export default requestInterceptor;
