import callAPI from './apiService';

export const GET_DEPARTMENT = () => callAPI.get("department");

export const GET_DEPARTMENT_BY_ID = (id) => callAPI.get("department/" + id);

export const DELETE_DEPARTMENT = (id) => callAPI.delete("department/" + id);

export const POST_DEPARTMENT = (body) => callAPI.post("department", body);

export const PUT_DEPARTMENT = (id, body) => callAPI.put("department/" + id, body);