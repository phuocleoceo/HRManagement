import callAPI from './apiService';
import { AUTH_HEADER } from './apiAuthentication';

export const GET_EMPLOYEE = () => callAPI.get("employee", AUTH_HEADER());

export const DELETE_EMPLOYEE = (id) => callAPI.delete("employee/" + id, AUTH_HEADER());

export const POST_EMPLOYEE = (body) => callAPI.post("employee", body, AUTH_HEADER());

export const PUT_EMPLOYEE = (id, body) => callAPI.put("employee/" + id, body, AUTH_HEADER());

export const SAVE_PHOTO = (body) => callAPI.post("employee/savefile", body, AUTH_HEADER());