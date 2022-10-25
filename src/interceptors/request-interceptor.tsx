import axios, {AxiosInstance} from 'axios';

export const TOKEN_KEY = 'access_token';

const requestInterceptor = (axiosInstance: AxiosInstance) => {
	axiosInstance.interceptors.request.use(config => {
			const token = window.localStorage.getItem(TOKEN_KEY);
			if (!config.headers) {
				config.headers = {};
			}
			if (token) {
				config.headers['Authorization'] = 'Client-ID ' + process.env.REACT_APP_IMGUR_CLIENT_ID;
			}
			config.headers['Content-Type'] = 'application/json';
			return config;
		},
		error => {
			Promise.reject(error);
		}
	);
};

const httpClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});
requestInterceptor(httpClient);

export default httpClient;