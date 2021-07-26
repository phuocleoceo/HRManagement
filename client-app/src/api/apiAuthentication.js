import callAPI from './apiService';
import { toast } from 'react-toastify';

export function REGISTER(body) {
	return callAPI("authentication/register", "POST", body);
};
export function LOGIN(body) {
	return callAPI("authentication/login", "POST", body);
}

export default function AUTH_HEADER() {
	const hrm = JSON.parse(localStorage.getItem("hrm_user"));
	if (hrm) {
		return { Authorization: "Bearer " + hrm.AccessToken };
	} else {
		toast.warn("You're not logged in or Token Expires !");
		return {};
	}
}