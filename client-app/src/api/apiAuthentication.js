import callAPI from './apiService';

export function REGISTER(body) {
	return callAPI("authentication/register", "POST", body);
};
export async function LOGIN(body) {
	const response = await callAPI("authentication/login", "POST", body);
	if (response.data.Token) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
}

export function LOGOUT() {
	localStorage.removeItem("user");
}

export function GET_CURRENT_USER() {
	return JSON.parse(localStorage.getItem("user"));
}

export function AUTH_HEADER() {
	const user = GET_CURRENT_USER();

	if (user && user.Token) {
		return { Authorization: 'Bearer ' + user.Token };
	} else {
		return {};
	}
}