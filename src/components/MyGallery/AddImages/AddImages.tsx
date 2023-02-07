import {useParams} from 'react-router';
import classes from './AddImages.module.scss';
import {useCallback, useContext, useEffect, useState} from 'react';
import DropBox from './Dropzone/Dropzone';
import ShowImages from './ShowImages/ShowImages';
import {IMAGE_DESCRIPTION_MINIMUM_WORDS_NUMBER, ImageType, NewlyAddedImage} from './models/NewlyAddedImage.model';
import {CountWords} from '../../../utils/NumberOfWords';
import {Album} from '../../../shared/models/Album.model';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../stores/globalStore';
import LoadingContext from '../../../stores/LoadingContext';
import {setAlbums} from '../../../stores/albumsSlice';
import {ConvertToBase64ForUpload} from '../../../utils/ConvertToBase64ForUpload';
import ProgressBar from '../../../shared/components/ProgressBar/ProgressBar';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../../interceptors/Interceptor';

const AddImages = () => {
	const {setLoading} = useContext(LoadingContext);
	const dispatch = useDispatch();
	const {albumId} = useParams();
	const [selectedAlbumId, setSelectedAlbumId] = useState('');
	const [newAlbumName, setNewAlbumName] = useState<string>('');
	const [progressPercentage, setProgressPercentage] = useState<number>(0);
	const [images, setImages] = useState<Array<NewlyAddedImage>>([]);
	const albums: Array<Album> = useSelector((state: RootState) => state.albums);
	let albumsLoaded = false;

	useEffect(() => {
		if (albumId) {
			setSelectedAlbumId(albumId);
		} else if (albums.length && albumsLoaded) {
			const album = albums.find((album) => album.title.toLowerCase() === 'other');
			setSelectedAlbumId(album.id);
		}
	}, [albumId, albums, albumsLoaded]);

	useEffect(() => {
		if (progressPercentage >= 100) {
			setLoading(false);
			setImages([]);
			setNewAlbumName('');
			setProgressPercentage(0);
			toast.success('Images have been uploaded successfully');
		}
	}, [progressPercentage, setLoading]);

	useEffect(() => {
		setLoading(true);
		httpClient.get(`https://api.imgur.com/3/account/me/albums`).then(
			(data) => {
				dispatch(setAlbums(data.data.data.map((album: any) => Album.deserialize(album))));
				albumsLoaded = true;
				setLoading(false);
			}
		).catch((error: Error) => {
			setLoading(false);
		});
	}, [dispatch, setLoading]);

	const onDrop = useCallback((acceptedFiles: Array<any>) => {
		acceptedFiles.map((file, index) => {
			const reader = new FileReader();
			reader.readAsDataURL(file as Blob);
			reader.onload = function(e) {
				const image: NewlyAddedImage = {
					id: new Date().toISOString() + index,
					src: e.target!.result.toString(),
					description: '',
					title: ''
				};
				setImages((prevState: Array<NewlyAddedImage>) => [
					...prevState,
					image
				]);
			};
			return file;
		});
	}, []);

	const removeImageFromQueue: Function = (imageId: string) => {
		setImages((prevState: Array<NewlyAddedImage>) => {
			return prevState.filter((image: NewlyAddedImage) => image.id !== imageId);
		});
	};

	const changeImageTitle: Function = (imageId: string, title: string) => {
		const imageIndex = images.findIndex((image: NewlyAddedImage) => image.id === imageId);
		const newImage = {...images[imageIndex], title: title};
		changeImageInImages(newImage, imageIndex);
	};

	const changeImageDescription: Function = (imageId: string, description: string) => {
		const imageIndex = images.findIndex((image: NewlyAddedImage) => image.id === imageId);
		const newImage = {...images[imageIndex], description: description};
		changeImageInImages(newImage, imageIndex);
	};

	const changeImageInImages: Function = (newImage: NewlyAddedImage, imageIndex: number) => {
		setImages((prevState: Array<NewlyAddedImage>) => {
			const newArray: Array<NewlyAddedImage> = [...prevState];
			newArray[imageIndex] = newImage;
			return newArray;
		});
	};

	const uploadImages = (event) => {
		event.preventDefault();
		setLoading(true);
		if (newAlbumName !== '') {
			httpClient.post(`https://api.imgur.com/3/album`, {
				title: newAlbumName,
			}).then(
				(data) => {
					toast.success('Album has been created !');
					uploadImagesToAlbum(data.data.data.id);
				}
			).catch((error: Error) => {
				setLoading(false);
			});
		} else {
			uploadImagesToAlbum();
		}
	};

	const uploadImagesToAlbum = (newAlbumId?: string) => {
		setLoading(true);
		setProgressPercentage(0);
		const config = {
			onUploadProgress: progressEvent => {
				let progress = progressPercentage;
				progress = (progressEvent.loaded / progressEvent.total) * 100;
				setProgressPercentage(progress);
			}
		};
		images.forEach((image: NewlyAddedImage) => {
			httpClient.post(`https://api.imgur.com/3/image`, {
				album: newAlbumId || selectedAlbumId,
				image: ConvertToBase64ForUpload(image.src),
				title: image.title,
				description: image.description,
				type: ImageType.base64
			}, config).then(
				(data) => {
				}
			).catch((error: Error) => {
				setLoading(false);
			});
		});
	};

	const checkFormValidity = (): boolean => {
		const allImagesHaveTitle = images.every((image: NewlyAddedImage) => image.title.trim().length >= 1);
		const allImagesHaveEnoughWordsDescription = images.every((image: NewlyAddedImage) => CountWords(image.description) >= IMAGE_DESCRIPTION_MINIMUM_WORDS_NUMBER);
		return allImagesHaveTitle && allImagesHaveEnoughWordsDescription;
	};

	return <div className={classes.AddImagesWrapper}>
		<section className={classes.DragAndDropArea}>
			<DropBox onDrop={onDrop}/>
		</section>
		<main className={`${classes.AddImagesFormWrapper} row`}>
			<form onSubmit={uploadImages}>
				<section className={classes.AlbumNameAndButtonWrapper}>
					{newAlbumName === '' &&
						<label htmlFor="album" className="col-xl-12 col-lg-12 offset-lg-0 col-md-12 col-12">Select an album</label>}
					<div className={classes.AlbumActionsRow}>
						{newAlbumName === '' && <select id="album"
						                                value={selectedAlbumId}
						                                className="col-xl-2 col-lg-3 offset-lg-0 col-md-12 col-12"
						                                onChange={(event) => setSelectedAlbumId(event.currentTarget.value)}>
							{albums.map((album: Album) => {
								return <option key={album.id} value={album.id}>{album.title}</option>;
							})}
						</select>}
						{newAlbumName === '' ?
							<p className="col-xl-2 col-lg-2 offset-lg-0 col-md-12 col-12">Or Create New Album</p> :
							<p className="col-xl-2 col-lg-2 offset-lg-0 col-md-12 col-12">New Album Name</p>}
						<input type="text"
						       placeholder="Album name"
						       className={`col-xl-2 col-lg-3 offset-lg-0 col-md-12 col-12 ${classes.AlbumName}`}
						       value={newAlbumName}
						       onChange={(event) => setNewAlbumName(event.target.value)}/>
						<button type="submit"
						        className={`col-xl-2 offset-xl-4 col-lg-2 offset-lg-2 col-md-12 col-12 
					        ${(images.length < 1 || !checkFormValidity()) && 'disabled'}`}>
							UPLOAD
						</button>
					</div>
				</section>
				{progressPercentage !== 0 && <ProgressBar percentage={progressPercentage}/>}
				<ShowImages images={images}
				            changeImageTitle={(imageId: string, title: string) => changeImageTitle(imageId, title)}
				            changeImageDescription={(imageId: string, description: string) => changeImageDescription(imageId, description)}
				            removeImage={(imageId: string) => removeImageFromQueue(imageId)}/>
			</form>
		</main>
	</div>;
};

export default AddImages;
