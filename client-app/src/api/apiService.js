import axios from 'axios';

let API_URL = "https://localhost:5001/api";
let department = "department";
let employee = "employee";

export function callAPI(endpoint, method, body) {
    return axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(e => {
        console.log(e)
    });
};

// DEPARTMENT
export function GET_ALL_DEPARTMENT() {
    return callApi(department, "GET");
};
export function DELETE_DEPARTMENT(id) {
    return callApi(department + "/" + id, "DELETE");
}
export function POST_DEPARTMENT(body) {
    return callApi(department, "POST", body);
}
export function PUT_DEPARTMENT(id, body) {
    return callApi(department + "/" + id, "PUT", body);
}

// EMPLOYEE
export function GET_ALL_EMPLOYEE() {
    return callApi(employee, "GET");
};
export function DELETE_EMPLOYEE(id) {
    return callApi(employee + "/" + id, "DELETE");
}
export function POST_EMPLOYEE(body) {
    return callApi(employee, "POST", body);
}
export function PUT_EMPLOYEE(id, body) {
    return callApi(employee + "/" + id, "PUT", body);
}