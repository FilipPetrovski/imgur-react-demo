import classes from '../Hot/Hot.module.scss';
import {useCallback, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/globalStore';
import {Album} from '../../shared/models/Album.model';
import Albums from '../../shared/components/Albums/Albums';
import {setAlbums} from '../../stores/albumsSlice';
import LoadingContext from '../../stores/LoadingContext';
import httpClient from '../../interceptors/Interceptor';
import {Image} from '../../shared/models/Image.model';

const MyGallery = () => {
	const albums: Array<Album> = useSelector((state: RootState) => state.albums);
	const dispatch = useDispatch();
	const {setLoading} = useContext(LoadingContext);

	const setAlbumImages = useCallback((album: Album) => {
		if (album.imagesCount) {
			httpClient.get(`https://api.imgur.com/3/album/${album.id}/image/${album.coverImageId}`).then(
				(data) => {
					const coverImage: Image = Image.deserialize(data.data.data);
					album = Album.update(album, {images: [coverImage]});
				}).catch((error: Error) => {
					setLoading(false)
				}
			)
		}
	}, [setLoading])

	useEffect(() => {
		setLoading(true);
		httpClient.get(`https://api.imgur.com/3/account/me/albums`).then(
			(data) => {
				const albums: Array<Album> = data.data.data.map((album: any) => Album.deserialize(album));
				albums.forEach((album: Album) => setAlbumImages(album));
				dispatch(setAlbums(albums));
				setLoading(false);
			}
		).catch((error: Error) => {
			setLoading(false);
		});
	}, [dispatch, setLoading, setAlbumImages]);

	return <>
		<h1 className={classes.Title}>MY GALLERY</h1>
		<Albums albums={albums}/>
	</>;
};

export default MyGallery;
