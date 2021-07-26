import callAPI from './apiService';
import { AUTH_HEADER } from './apiAuthentication';

export const GET_EMPLOYEE = () => callAPI("employee", "GET");

export const DELETE_EMPLOYEE = (id) => callAPI("employee/" + id, "DELETE", {}, AUTH_HEADER());

export const POST_EMPLOYEE = (body) => callAPI("employee", "POST", body, AUTH_HEADER());

export const PUT_EMPLOYEE = (id, body) => callAPI("employee/" + id, "PUT", body, AUTH_HEADER());

export const SAVE_PHOTO = (body) => callAPI("employee/savefile", "POST", body, AUTH_HEADER());