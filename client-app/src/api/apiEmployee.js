import callAPI from './apiService';

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