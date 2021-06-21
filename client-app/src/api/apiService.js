import axios from 'axios';

let API_URL = "https://localhost:5001/api";

async function callAPI(endpoint, method, body) {
    try {
        return axios({
            method,
            url: `${API_URL}/${endpoint}`,
            data: body
        });
    } catch (e) {
        console.log(e);
    }
};

// DEPARTMENT
export function GET_DEPARTMENT() {
    return callAPI("department", "GET");
};
export function DELETE_DEPARTMENT(id) {
    return callAPI("department/" + id, "DELETE");
}
export function POST_DEPARTMENT(body) {
    return callAPI("department", "POST", body);
}
export function PUT_DEPARTMENT(id, body) {
    return callAPI("department/" + id, "PUT", body);
}

// EMPLOYEE
export function GET_EMPLOYEE() {
    return callAPI("employee", "GET");
};
export function DELETE_EMPLOYEE(id) {
    return callAPI("employee/" + id, "DELETE");
}
export function POST_EMPLOYEE(body) {
    return callAPI("employee", "POST", body);
}
export function PUT_EMPLOYEE(id, body) {
    return callAPI("employee/" + id, "PUT", body);
}