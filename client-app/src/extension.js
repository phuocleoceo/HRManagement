export function formatDateForBE(date) {
	// yyyy-mm-dd => dd/mm/yyyy
	var dateArray = date.split("-");
	return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
}

export function formatDateForFE(date) {
	// dd/mm/yyyy => yyyy-mm-dd 
	var dateArray = date.split("/");
	return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
}

//const DOMAIN_NAME = "https://bsite.net/phuocleoceo/";
const DOMAIN_NAME = "https://localhost:5001/";

export const API_URL = DOMAIN_NAME + "api";

export const PHOTO_URL = DOMAIN_NAME + "Photos/";