import axios, {AxiosInstance} from "axios";
import env from "@/src/configs/env";

const useHttpPublicRequest = (baseUrl: string): AxiosInstance => {
	return axios.create({
		baseURL: env.apiUrl,
		timeout: env.apiTimeout,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		}
	});
}

export default useHttpPublicRequest;