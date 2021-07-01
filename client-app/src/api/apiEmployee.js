import callAPI from './apiService';
import AUTH_HEADER from './apiAuthentication';

export function GET_EMPLOYEE() {
	return callAPI("employee", "GET");
};
export function DELETE_EMPLOYEE(id) {
	return callAPI("employee/" + id, "DELETE", {}, AUTH_HEADER());
}
export function POST_EMPLOYEE(body) {
	return callAPI("employee", "POST", body, AUTH_HEADER());
}
export function PUT_EMPLOYEE(id, body) {
	return callAPI("employee/" + id, "PUT", body, AUTH_HEADER());
}