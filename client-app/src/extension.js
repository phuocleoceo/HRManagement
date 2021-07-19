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

export const API_URL = "https://bsite.net/phuocleoceo/api";
//export const API_URL = "https://localhost:5001/api";

export const PHOTO_URL = "https://bsite.net/phuocleoceo/Photos/";
//export const PHOTO_URL = "https://localhost:5001/Photos/";