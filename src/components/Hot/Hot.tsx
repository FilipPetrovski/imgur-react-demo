import classes from '../Hot/Hot.module.scss';
import {useContext, useEffect} from 'react';
import httpClient from '../../interceptors/RequestInterceptor';
import {Album} from '../../shared/models/Album.model';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/globalStore';
import {setAlbums} from '../../stores/albumsSlice';
import Albums from '../../shared/components/Albums/Albums';
import LoadingContext from '../../stores/LoadingContext';

const Hot = () => {
	const albums: Array<Album> = useSelector((state: RootState) => state.albums);
	const dispatch = useDispatch();
	const {setLoading} = useContext(LoadingContext);

	useEffect(() => {
		setLoading(true);
		httpClient.get(`https://api.imgur.com/3/gallery/hot/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}`).then(
			(data) => {
				dispatch(setAlbums(data.data.data.map((album: any) => Album.deserialize(album))));
				setLoading(false);
			}
		).catch((error: Error) => {
			console.log(error);
			setLoading(false);
		})
	}, [dispatch, setLoading]);
	return <>
		<h1 className={classes.Title}>HOT</h1>
		<Albums albums={albums}/>
	</>;
};

export default Hot;
