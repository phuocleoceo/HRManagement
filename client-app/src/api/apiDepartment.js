import callAPI from './apiService';
import { AUTH_HEADER } from './apiAuthentication';

export const GET_DEPARTMENT = () => callAPI.get("department");

export const DELETE_DEPARTMENT = (id) => callAPI.delete("department/" + id, AUTH_HEADER());

export const POST_DEPARTMENT = (body) => callAPI.post("department", body, AUTH_HEADER());

export const PUT_DEPARTMENT = (id, body) => callAPI.put("department/" + id, body, AUTH_HEADER());