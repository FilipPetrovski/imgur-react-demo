import axios from 'axios';
import requestInterceptor from './RequestInterceptor';
import errorInterceptor from './ErrorInterceptor';

const httpClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});
requestInterceptor(httpClient);
errorInterceptor(httpClient);

export default httpClient;