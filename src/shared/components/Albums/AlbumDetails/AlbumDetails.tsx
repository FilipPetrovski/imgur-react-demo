import React, {BaseSyntheticEvent, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Album} from '../../../models/Album.model';
import classes from './AlbumDetails.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight, faPenToSquare, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import noImage from '../../../../assets/images/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpeg';
import {RoutesName} from '../../../models/Routes';
import LoadingContext from '../../../../stores/LoadingContext';
import {useNavigate} from 'react-router-dom';
import {Image} from '../../../models/Image.model';
import useModal from '../../../hooks/UseModal';
import ConfirmationModal from '../../Modal/ConfirmationModal';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../../../interceptors/Interceptor';

const initialAlbum = new Album({id: '', images: [], imagesCount: 0, title: '', coverImageId: ''});

const AlbumDetails = () => {
	const [currentImageNumber, setCurrentImageNumber] = useState(1);
	const [isEditMode, setIsEditMode] = useState(false);
	const [album, setAlbum] = useState(initialAlbum);
	const {albumId, gallery} = useParams();
	const {visible, toggle} = useModal();
	const navigate = useNavigate();
	const isMyGallery = gallery === RoutesName.MyGallery;
	const {setLoading} = useContext(LoadingContext);
	let loadedOnce: boolean; // TODO this loadedOnce is fix for development so that the use effect wont run twice and send two request -> https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e

	useEffect(() => {
		if (!loadedOnce) {
			setLoading(true);
			httpClient.get(`https://api.imgur.com/3/album/${albumId}`).then(
				(data) => {
					setAlbum(Album.deserialize(data.data.data));
					setLoading(false);
				}
			).catch((error: Error) => {
				setLoading(false);
			});
		}
		return () => {
			loadedOnce = true;
		};
	}, [setLoading]);

	const goToNextImage = () => {
		if (currentImageNumber < album.imagesCount) {
			setCurrentImageNumber((prevState => prevState + 1));
		}
	};

	const goToPreviousImage = () => {
		if (currentImageNumber > 1) {
			setCurrentImageNumber((prevState => prevState - 1));
		}
	};

	const navigateToAddImages = () => {
		navigate(`/${RoutesName.AddImages}/${albumId}`);
	};

	const saveImageUpdates = (event: BaseSyntheticEvent) => {
		setLoading(true);
		event.preventDefault();
		const description = event.target.description.value;
		const title = event.target.title.value;
		httpClient.post(`https://api.imgur.com/3/image/${album.images[currentImageNumber - 1].id}`, {
			title: title,
			description: description
		}).then(() => {
				album.images[currentImageNumber - 1] = new Image({
					...album.images[currentImageNumber - 1],
					title: title,
					description: description
				});
				toast.success('Image has been updated');
				setIsEditMode(false);
				setLoading(false);
			}
		).catch((error: Error) => {
				setLoading(false);
			}
		);
	};

	const deletePhoto = () => {
		setLoading(true);
		httpClient.delete(`https://api.imgur.com/3/image/${album.images[currentImageNumber - 1].id}`)
			.then(() => {
					const filteredImages: Array<Image> = album.images.filter((image: Image) => image.id !== album.images[currentImageNumber - 1].id);
					const updatedAlbum: Album = new Album({...album, images: filteredImages, imagesCount: album.imagesCount - 1});
					if (currentImageNumber === album.imagesCount) {
						setCurrentImageNumber(currentImageNumber - 1);
					}
					toast.success('Image has been deleted');
					setAlbum(updatedAlbum);
					setLoading(false);
				}
			).catch((error: Error) => {
				setLoading(false);
			}
		);
	};

	const renderMediaPreview = () => {
		return <>
			{album.imagesCount && (album.images[currentImageNumber - 1].isImage() || album.images[currentImageNumber - 1].isGif()) ?
				<img className="img-fluid"
				     src={album.images[currentImageNumber - 1].url}
				     alt={album.images[currentImageNumber - 1].description}/>
				:
				(album.imagesCount && album.images[currentImageNumber - 1].isVideo() ?
					<video width="100%"
					       height="100%"
					       autoPlay
					       muted>
						<source src={album.images[currentImageNumber - 1].url}
						        type="video/mp4"/>
					</video>
					:
					<img src={noImage} alt="no preview"/>)
			}
			{isEditMode && <input autoFocus={true}
			                      name="description"
			                      className={classes.ImageDescription}
			                      defaultValue={album.images[currentImageNumber - 1].description}
			/>}
			{!isEditMode && !!album.imagesCount && album.images[currentImageNumber - 1].description &&
				<div className={classes.ImageDescription}>
					{album.images[currentImageNumber - 1].description}
				</div>}
		</>;
	};

	return <div className="row">
		<div className={`${classes.AlbumWrapper} col-xl-12 col-lg-10 col-md-10 col-10`}>
			<ConfirmationModal visible={visible}
			                   toggle={toggle}
			                   onLeftButtonClick={() => {
			                   }}
			                   onRightButtonClick={() => deletePhoto()}
			                   text="Are you sure you want to delete this photo?"></ConfirmationModal>
			<form onSubmit={saveImageUpdates}>
				<header className={classes.Header}>
					{!!album.imagesCount &&
						<p className={classes.CurrentImageText}>Current image:
							<span>{currentImageNumber} / {album.imagesCount}</span>
						</p>
					}
					{isMyGallery && <div className={classes.Icons}>
						{!isEditMode ?
							<>
								<FontAwesomeIcon icon={faPlus} onClick={navigateToAddImages}/>
								{!!album.imagesCount && <>
									<FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsEditMode(true)}/>
									<FontAwesomeIcon icon={faTrashCan} onClick={toggle}/>
								</>
								}
							</>
							:
							<>
								<button>
									<FontAwesomeIcon icon={faCircleCheck}
									                 className={classes.Save}
									/>
								</button>
								<FontAwesomeIcon icon={faCircleXmark}
								                 className={classes.Cancel}
								                 onClick={() => setIsEditMode(false)}/>
							</>
						}
					</div>
					}
				</header>
				<section className={classes.ImageWrapper}>
					{renderMediaPreview()}
				</section>
				<section className={classes.ImageTitleWrapper}>
					<FontAwesomeIcon className={`${classes.PreviousImageIcon} ${(currentImageNumber <= 1 || isEditMode) && 'disabled'}`}
					                 icon={faChevronLeft}
					                 onClick={goToPreviousImage}/>
					{isEditMode && <input className={classes.ImageTitleInput}
					                      name="title"
					                      defaultValue={album.images[currentImageNumber - 1].title}
					/>}
					{!isEditMode &&
						<p className={classes.ImageTitle}>{album && album.images && album.images[currentImageNumber - 1] && album.images[currentImageNumber - 1].title}</p>}
					<FontAwesomeIcon
						className={`${classes.NextImageIcon} ${(currentImageNumber === album.imagesCount || album.imagesCount === 0 || isEditMode) && 'disabled'}`}
						icon={faChevronRight}
						onClick={goToNextImage}/>
				</section>
			</form>
		</div>
	</div>;
};

export default AlbumDetails;
