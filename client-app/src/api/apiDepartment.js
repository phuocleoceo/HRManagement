import callAPI from './apiService';

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