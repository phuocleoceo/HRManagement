import callAPI from './apiService';

export const REGISTER = (body) => callAPI.post("authentication/register", body);

export const LOGIN = (body) => callAPI.post("authentication/login", body);

export const REFRESH_TOKEN = (body) => callAPI.post("token/refresh", body);

export const REVOKE_TOKEN = () => callAPI.post("token/revoke", {}, AUTH_HEADER());

export const AUTH_HEADER = () => {
	const hrm = JSON.parse(localStorage.getItem("hrm_user"));
	if (hrm) return { headers: { "Authorization": "Bearer " + hrm.AccessToken } };
	return {};
}