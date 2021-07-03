import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET_EMPLOYEE } from '../../api/apiEmployee';

export const GetEmps = createAsyncThunk(
	"employee/GetEmps",
	async () => {
		const response = await GET_EMPLOYEE();
		return response.data;
	});

export const employeeSlice = createSlice({
	name: 'employee',
	initialState: [],
	reducers: {},
	extraReducers: {
		[GetEmps.fulfilled]: (state, action) => {
			return action.payload;
		}
	}
})

//export const { } = employeeSlice.actions

export default employeeSlice.reducer