import callAPI from './apiService';
import { AUTH_HEADER } from './apiAuthentication';

export const GET_DEPARTMENT = () => callAPI("department", "GET");

export const DELETE_DEPARTMENT = (id) => callAPI("department/" + id, "DELETE", {}, AUTH_HEADER());

export const POST_DEPARTMENT = (body) => callAPI("department", "POST", body, AUTH_HEADER());

export const PUT_DEPARTMENT = (id, body) => callAPI("department/" + id, "PUT", body, AUTH_HEADER());
