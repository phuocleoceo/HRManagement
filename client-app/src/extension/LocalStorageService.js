export const SET_HRM_USER = (data) => {
	localStorage.setItem("hrm_user", JSON.stringify(data));
}

export const GET_HRM_USER = () => {
	return JSON.parse(localStorage.getItem("hrm_user"));
}

export const REMOVE_HRM_USER = () => {
	localStorage.removeItem("hrm_user");
}

export const GET_ACCESS_TOKEN = () => {
	const hrm = GET_HRM_USER();
	return hrm ? hrm.AccessToken : "";
}

export const GET_REFRESH_TOKEN = () => {
	const hrm = GET_HRM_USER();
	return hrm ? hrm.RefreshToken : "";
}

export const GET_USER_INFOR = () => {
	const hrm = GET_HRM_USER();
	return hrm ? hrm.User : null;
}