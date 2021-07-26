import axios from 'axios';
import { API_URL } from '../extension';

const callAPI = async (endpoint, method, body, header) => {
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