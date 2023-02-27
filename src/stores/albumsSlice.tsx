import {Album} from '../shared/models/Album.model';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: Array<Album> = [];

// The use of redux for this application is redundant, but I used it for learning purposes
const albumsSlice = createSlice({
	name: 'albums',
	initialState,
	reducers: {
		setAlbums: (state, action: PayloadAction<Array<Album>>) => {
			return [...action.payload];
		}
	},
});

export const {setAlbums} = albumsSlice.actions;

export default albumsSlice;
