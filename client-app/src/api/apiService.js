import axios from 'axios';
import AUTH_HEADER from './apiAuthentication';

let API_URL = "https://localhost:5001/api";

async function callAPI(endpoint, method, body) {
    const hd = AUTH_HEADER();
    try {
        return axios({
            method,
            url: API_URL + "/" + endpoint,
            data: body,
            headers: hd
        });
    } catch (e) {
        console.log(e);
    }
};

export default callAPI;