export const formatDateForBE = (date) => {
	// yyyy-mm-dd => dd/mm/yyyy
	var dateArray = date.split("-");
	return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
}

export const formatDateForFE = (date) => {
	// dd/mm/yyyy => yyyy-mm-dd 
	var dateArray = date.split("/");
	return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
}