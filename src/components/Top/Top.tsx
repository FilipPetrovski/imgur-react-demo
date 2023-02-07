import classes from './Top.module.scss';
import {useContext, useEffect} from 'react';
import {Album} from '../../shared/models/Album.model';
import {useDispatch, useSelector} from 'react-redux';
import {setAlbums} from '../../stores/albumsSlice';
import {RootState} from '../../stores/globalStore';
import Albums from '../../shared/components/Albums/Albums';
import LoadingContext from '../../stores/LoadingContext';
import httpClient from '../../interceptors/Interceptor';

const Top = () => {
	const albums: Array<Album> = useSelector((state: RootState) => state.albums);
	const dispatch = useDispatch();
	const {setLoading} = useContext(LoadingContext);

	useEffect(() => {
		setLoading(true);
		httpClient.get(`https://api.imgur.com/3/gallery/top/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}`).then(
			(data) => {
				dispatch(setAlbums(data.data.data.map((album: any) => Album.deserialize(album))));
				setLoading(false);
			}
		).catch((error: Error) => {
			setLoading(false);
		})
	}, [dispatch, setLoading]);
	return <>
		<h1 className={classes.Title}>TOP</h1>
		<Albums albums={albums}/>
	</>;
};

export default Top;
