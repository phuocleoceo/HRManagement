import axios from 'axios';

// let API_URL = "https://localhost:5001/api";
let API_URL = "https://bsite.net/phuocleoceo/api";

async function callAPI(endpoint, method, body, header) {
	try {
		return axios({
			method,
			url: API_URL + "/" + endpoint,
			data: body,
			headers: header
		});
	} catch (e) {
		console.log(e);
	}
};

export default callAPI;