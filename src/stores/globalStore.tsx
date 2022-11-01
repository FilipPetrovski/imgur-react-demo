import {configureStore} from '@reduxjs/toolkit';
import albumsSlice from './albumsSlice';

const globalStore = configureStore({
	reducer: {
		albums: albumsSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export type RootState = ReturnType<typeof globalStore.getState>
export default globalStore;
