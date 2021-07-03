import { GET_DEPARTMENT } from '../../api/apiDepartment';

export const GET_ALL_DEPARTMENT = () => async (dispatch) => {
	const response = await GET_DEPARTMENT();
	dispatch({
		type: "GET_ALL_DEPARTMENT",
		payload: response.data
	});
};

// export function GET_ALL_DEPARTMENT() {
// 	return async (dispatch) => {
// 		const list = await GET_DEPARTMENT();
// 		dispatch({
// 			type: "GET_ALL_DEPARTMENT",
// 			payload: list.data
// 		});
// 	};
// }