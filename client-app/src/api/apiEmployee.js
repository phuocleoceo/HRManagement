import callAPI from './apiService';

export const GET_EMPLOYEE = () => callAPI.get("employee");

export const DELETE_EMPLOYEE = (id) => callAPI.delete("employee/" + id);

export const POST_EMPLOYEE = (body) => callAPI.post("employee", body);

export const PUT_EMPLOYEE = (id, body) => callAPI.put("employee/" + id, body);

export const SAVE_PHOTO = (body) => callAPI.post("employee/savefile", body);