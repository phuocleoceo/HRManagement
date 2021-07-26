import callAPI from './apiService';

export const REGISTER = (body) => callAPI("authentication/register", "POST", body);

export const LOGIN = (body) => callAPI("authentication/login", "POST", body);

export const AUTH_HEADER = () => {
	const hrm = JSON.parse(localStorage.getItem("hrm_user"));
	if (hrm) return { Authorization: "Bearer " + hrm.AccessToken };
	return {};
}