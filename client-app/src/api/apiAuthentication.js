import callAPI from './apiService';

export function REGISTER(body) {
	return callAPI("authentication/register", "POST", body);
};
export async function LOGIN(body) {
	const response = await callAPI("authentication/login", "POST", body);
	if (response.data.Token) {
		localStorage.setItem("hrm_user", JSON.stringify(response.data));
	}
	return response.data;
}

export function LOGOUT() {
	localStorage.removeItem("hrm_token");
}

export function GET_CURRENT_HRM_USER() {
	return JSON.parse(localStorage.getItem("hrm_token"));
}

export default function AUTH_HEADER() {
	const hrm = GET_CURRENT_HRM_USER();

	if (hrm.User && hrm.Token) {
		return { Authorization: "Bearer " + hrm.Token };
	} else {
		return {};
	}
}