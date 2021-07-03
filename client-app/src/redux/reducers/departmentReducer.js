const initialState = {};

const departmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ABC": {
			return state;
		}
		default:
			return state;
	}
};

export default departmentReducer;