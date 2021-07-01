import callAPI from './apiService';
import AUTH_HEADER from './apiAuthentication';

export function GET_DEPARTMENT() {
	return callAPI("department", "GET");
};
export function DELETE_DEPARTMENT(id) {
	return callAPI("department/" + id, "DELETE", {}, AUTH_HEADER());
}
export function POST_DEPARTMENT(body) {
	return callAPI("department", "POST", body, AUTH_HEADER());
}
export function PUT_DEPARTMENT(id, body) {
	return callAPI("department/" + id, "PUT", body, AUTH_HEADER());
}