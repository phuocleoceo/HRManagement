const initialState = {};

const employeeReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ABC": {
			return state;
		}
		default:
			return state;
	}
};

export default employeeReducer;