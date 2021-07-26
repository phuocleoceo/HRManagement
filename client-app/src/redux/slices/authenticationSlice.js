import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOGIN, REGISTER } from '../../api/apiAuthentication';

export const RegisterAction = createAsyncThunk(
	"authentication/RegisterAction",
	async (body) => {
		try {
			const response = await REGISTER(body);
			return response.status === 201;
		}
		catch { return false; }
	}
);

export const LoginAction = createAsyncThunk(
	"authentication/LoginAction",
	async (body) => {
		try {
			const response = await LOGIN(body);
			if (response.status === 200) {
				return {
					Accepted: true,
					ResponseData: response.data
				}
			}
			return { Accepted: false }
		}
		catch {
			return { Accepted: false }
		}
	}
);

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState: false,
	reducers: {
		CheckLoggedin: (state, action) => {
			const hrm_user = localStorage.getItem("hrm_user");
			if (!hrm_user) return false;
			else return true;
		},
		Logout: (state, action) => {
			localStorage.removeItem("hrm_user");
			return false;
		}
	},
	extraReducers: {
		[LoginAction.fulfilled]: (state, action) => {
			if (action.payload.Accepted) {
				localStorage.setItem("hrm_user", JSON.stringify(action.payload.ResponseData));
				return true;
			}
			return false;
		}
	}
})

export const { CheckLoggedin, Logout } = authenticationSlice.actions

export default authenticationSlice.reducer