const initialState = [];

const departmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_ALL_DEPARTMENT": {
			return action.payload;
		}
		default:
			return state;
	}
};

export default departmentReducer;