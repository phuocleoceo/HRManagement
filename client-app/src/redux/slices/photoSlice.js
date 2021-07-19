import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SAVE_PHOTO } from '../../api/apiEmployee';
import { toast } from 'react-toastify';
import { PHOTO_URL } from '../../extension';

export const SavePhoto = createAsyncThunk(
	"employee/SavePhoto",
	async (body) => {
		try {
			const response = await SAVE_PHOTO(body);
			return PHOTO_URL + response.data;
		}
		catch {
			toast.error("Save Photo Fail");
		}
	}
);

export const photoSlice = createSlice({
	name: 'photo',
	initialState: PHOTO_URL + "anonymous.png",
	reducers: {},
	extraReducers: {
		[SavePhoto.fulfilled]: (state, action) => {
			return action.payload;
		}
	}
})

//export const { } = photoSlice.actions

export default photoSlice.reducer