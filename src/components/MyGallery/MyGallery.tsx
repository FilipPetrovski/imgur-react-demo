import classes from '../Hot/Hot.module.scss';
import {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/globalStore';
import {Album} from '../../shared/models/Album.model';
import Albums from '../../shared/components/Albums/Albums';
import {setAlbums} from '../../stores/albumsSlice';
import LoadingContext from '../../stores/LoadingContext';
import httpClient from '../../interceptors/Interceptor';

const MyGallery = () => {
	const albums: Array<Album> = useSelector((state: RootState) => state.albums);
	const dispatch = useDispatch();
	const {setLoading} = useContext(LoadingContext);

	useEffect(() => {
		setLoading(true);
		httpClient.get(`https://api.imgur.com/3/account/me/albums`).then(
			(data) => {
				const albums: Array<Album> = data.data.data.map((album: any) => Album.deserialize(album));
				dispatch(setAlbums(albums));
				setLoading(false);
			}
		).catch((error: Error) => {
			setLoading(false);
		});
	}, [dispatch, setLoading]);

	return <>
		<h1 className={classes.Title}>MY GALLERY</h1>
		<Albums albums={albums}/>
	</>;
};

export default MyGallery;
