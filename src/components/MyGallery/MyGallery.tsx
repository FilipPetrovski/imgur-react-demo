import classes from '../Hot/Hot.module.scss';
import {useContext, useEffect} from 'react';
import httpClient from '../../interceptors/RequestInterceptor';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/globalStore';
import {Album} from '../../shared/models/Album.model';
import Albums from '../../shared/components/Albums/Albums';
import {setAlbums} from '../../stores/albumsSlice';
import LoadingContext from '../../stores/LoadingContext';

const MyGallery = () => {
	const albums: Array<Album> = useSelector((state: RootState) => state.albums);
	const dispatch = useDispatch();
	const {setLoading} = useContext(LoadingContext);
	useEffect(() => {
		setLoading(true);
		httpClient.get(`https://api.imgur.com/3/account/me/albums`).then(
			(data) => {
				dispatch(setAlbums(data.data.data.map((album: any) => Album.deserialize(album))));
				setLoading(false);
			}
		).catch((erorr: Error) => {
			console.log(erorr);
			setLoading(false);
		});
	}, [dispatch, setLoading]);
	return <>
		<h1 className={classes.Title}>MY GALLERY</h1>
		<Albums albums={albums}/>
	</>;
};

export default MyGallery;
