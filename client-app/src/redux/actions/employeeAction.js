import { GET_EMPLOYEE } from '../../api/apiEmployee';

export const GET_ALL_EMPLOYEE = () => async (dispatch) => {
	const response = await GET_EMPLOYEE();
	dispatch({
		type: "GET_ALL_EMPLOYEE",
		payload: response.data
	});
};