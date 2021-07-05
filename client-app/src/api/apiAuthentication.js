import callAPI from './apiService';
import { toast } from 'react-toastify';

export async function REGISTER(body) {
	try {
		const response = await callAPI("authentication/register", "POST", body);
		if (response.status === 201)
			return true;
		return false;
	}
	catch {
		return false;
	}
};
export async function LOGIN(body) {
	try {
		const response = await callAPI("authentication/login", "POST", body);
		if (response.data) {
			localStorage.setItem("hrm_user", JSON.stringify(response.data));
			return true;
		}
		return false;
	}
	catch {
		return false;
	}
}

export function LOGOUT() {
	localStorage.removeItem("hrm_user");
}

export function GET_CURRENT_HRM_USER() {
	return JSON.parse(localStorage.getItem("hrm_user"));
}

export default function AUTH_HEADER() {
	const hrm = GET_CURRENT_HRM_USER();
	if (hrm) {
		return { Authorization: "Bearer " + hrm.Token };
	} else {
		toast.warn("Chưa đăng nhập kìa !");
		return {};
	}
}