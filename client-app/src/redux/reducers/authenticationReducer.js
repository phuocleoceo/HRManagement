const initialState = {};

const authenticationReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ABC": {
			return state;
		}
		default:
			return state;
	}
};

export default authenticationReducer;