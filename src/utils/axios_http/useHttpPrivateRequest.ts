import axios, {AxiosInstance} from 'axios';
import env from "@/src/configs/env";

class UseHttpPrivateRequest {
	instance: AxiosInstance;

	constructor() {
		this.instance = axios.create({
			baseURL: env.apiUrl,
			timeout: env.apiTimeout,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		this.configInterceptors();
	}

	private configInterceptors() {
		this.instance.interceptors.request.use(
			async config => {
				const token = localStorage.getItem('auth_token');
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error: Promise<any>) => {
				return Promise.reject(error);
			}
		)

		this.instance.interceptors.response.use(
			response => response,
			async error => {
				const originalRequest = error.config;

				if (error.response) {
					switch (error.response.status) {
						case 401:
							originalRequest.retry = true;
							break;
						case 403:
							// Handle forbidden access
							originalRequest.retry = true;
							break;
						case 404:
							// Handle not found
							originalRequest.retry = true;
							break;
						default:
							break;
					}
				}
				return Promise.reject(error);
			}
		)
	}
}

const axiosHttp = new UseHttpPrivateRequest().instance;
export default axiosHttp;