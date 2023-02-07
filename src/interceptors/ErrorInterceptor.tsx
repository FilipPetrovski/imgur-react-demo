import {AxiosError, AxiosInstance} from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const errorInterceptor = (axiosInstance: AxiosInstance) => {
	axiosInstance.interceptors.response.use(
		res => res,
		(error: AxiosError) => {
			toast.error(error.message || 'Something went wrong ! Please refresh the page.');
			throw error;
		}
	);
};

export default errorInterceptor;