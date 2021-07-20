import { createSlice } from '@reduxjs/toolkit';

const initialStates = {
	Id: 0,
	Name: "",
	Department: "",
	DateOfJoining: "",
	PhotoURL: ""
};

export const currentEmpSlice = createSlice({
	name: 'currentEmp',
	initialState: initialStates,
	reducers: {
		setCurrentEmp: (state, action) => {
			return action.payload;
		}
	},
	extraReducers: {}
})

export const { setCurrentEmp } = currentEmpSlice.actions

export default currentEmpSlice.reducer