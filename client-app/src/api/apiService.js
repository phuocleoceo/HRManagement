import axios from 'axios';
import { API_URL } from '../extension';

const callAPI = axios.create({
	baseURL: API_URL,
	headers: {
		'content-type': 'application/json'
	}
});

callAPI.interceptors.request.use((config) => {
	// Add AccessToken to Headers
	const hrm = JSON.parse(localStorage.getItem("hrm_user"));
	const accessToken = hrm ? hrm.AccessToken : "";
	config.headers["Authorization"] = "Bearer " + accessToken;
	return config;
}, (error) => {
	Promise.reject(error);
})

callAPI.interceptors.response.use((response) => {
	return response;
}, async (error) => {
	const originalRequest = error.config;
	if (error.response.status === 401 && !originalRequest._retry) {
		originalRequest._retry = true;
		// Get Current TokenAPI
		const hrm = JSON.parse(localStorage.getItem("hrm_user"));
		const tokenAPI = hrm ? {
			accessToken: hrm.AccessToken,
			refreshToken: hrm.RefreshToken
		} : {};
		// RefreshToken
		const check = await callAPI.post("token/refresh", tokenAPI);
		if (check.status === 200) {
			const newHRMUser = {
				AccessToken: check.data.AccessToken,
				RefreshToken: check.data.RefreshToken,
				User: hrm.User
			}
			localStorage.setItem("hrm_user", JSON.stringify(newHRMUser));
			// Recall API
			callAPI.defaults.headers.common["Authorization"] = "Bearer " + check.data.AccessToken;
			return callAPI(originalRequest);
		}
		return Promise.reject(error);
	}
});

export default callAPI;