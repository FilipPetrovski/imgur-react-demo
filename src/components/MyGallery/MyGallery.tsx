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

	const setAlbumImages = useCallback((albums: Array<Album>) => {
		setLoading(true);
		let requests = [];
		const emptyAlbums = albums.filter((album: Album) => album.imagesCount === 0);
		albums.filter(album => album.imagesCount).forEach((album: Album) => requests.push(httpClient.get(`https://api.imgur.com/3/album/${album.id}/image/${album.coverImageId}`)));
		Promise.all(requests).then(result => {
			let updatedAlbumsWithImages: Array<Album> = [];
			result.forEach((data) => {
				const image: Image = Image.deserialize(data.data.data);
				const albumToUpdate = albums.find((album: Album) => album.coverImageId === image.id);
				const updatedAlbum = Album.update(albumToUpdate, {images: [image]});
				updatedAlbumsWithImages.push(updatedAlbum);
				const updatedAlbums = [...updatedAlbumsWithImages, ...emptyAlbums];
				dispatch(setAlbums(updatedAlbums));
			});
			setLoading(false);
		}).catch(error => setLoading(false));
	}, [setLoading, dispatch]);

	useEffect(() => {
		setLoading(true);
		httpClient.get(`https://api.imgur.com/3/account/me/albums`).then(
			(data) => {
				const albums: Array<Album> = data.data.data.map((album: any) => Album.deserialize(album));
				setAlbumImages(albums);
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
