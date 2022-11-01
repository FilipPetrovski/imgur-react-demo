import {Album} from '../shared/models/Album.model';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: Array<Album> = [];

const albumsSlice = createSlice({
	name: 'albums',
	initialState,
	reducers: {
		setAlbums: (state, action: PayloadAction<Array<Album>>) => {
			return [...action.payload];
		},
		addAlbum: (state, action: PayloadAction<Album>) => {
			return [...state, action.payload];
		},
		deleteAlbum: (state, action: PayloadAction<string>) => {
			return state.filter((album) => album.id !== action.payload);
		}
	},
});

export const {setAlbums, addAlbum, deleteAlbum} = albumsSlice.actions;

export default albumsSlice;
