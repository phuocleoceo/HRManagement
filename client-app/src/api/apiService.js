import axios from 'axios';

let API_URL = "https://localhost:5001/api";

async function callAPI(endpoint, method, body) {
    try {
        return axios({
            method,
            url: API_URL + "/" + endpoint,
            data: body
        });
    } catch (e) {
        console.log(e);
    }
};

export default callAPI;