import axios, {AxiosInstance} from 'axios';

export const TOKEN_KEY = 'access_token';

const requestInterceptor = (axiosInstance: AxiosInstance) => {
	axiosInstance.interceptors.request.use(config => {
			const accessToken = window.localStorage.getItem(TOKEN_KEY);
			if (!config.headers) {
				config.headers = {};
			}
			if (accessToken) {
				config.headers['Authorization'] = 'Bearer' + accessToken;
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