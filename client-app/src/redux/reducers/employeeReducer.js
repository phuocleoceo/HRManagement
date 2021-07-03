const initialState = [];

const employeeReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_ALL_EMPLOYEE": {
			return action.payload;
		}
		default:
			return state;
	}
};

export default employeeReducer;