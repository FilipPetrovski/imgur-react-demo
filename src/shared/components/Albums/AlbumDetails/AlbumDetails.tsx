import React, {BaseSyntheticEvent, useContext, useEffect, useState} from 'react';
import httpClient from '../../../../interceptors/RequestInterceptor';
import {useParams} from 'react-router';
import {Album} from '../../../models/Album.model';
import classes from './AlbumDetails.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	faPlus,
	faPenToSquare,
	faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import noImage from '../../../../assets/images/No-Image-Placeholder.svg.png';
import {RoutesName} from '../../../models/Routes';
import LoadingContext from '../../../../stores/LoadingContext';
import {useNavigate} from 'react-router-dom';
import {Image} from '../../../models/Image.model';

const AlbumDetails = () => {
	const [currentImageNumber, setCurrentImageNumber] = useState(1);
	const [isEditMode, setIsEditMode] = useState(false);
	const [album, setAlbum] = useState(new Album());
	const {albumId, gallery} = useParams();
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
				console.log(error);
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
		event.preventDefault();
		const description = event.target.description.value;
		const title = event.target.title.value;
		httpClient.post(`https://api.imgur.com/3/image/${album.images[currentImageNumber - 1].id}`, {
			title: title,
			description: description
		}).then(() => {
				const updatedImage: Image = {
					...album.images[currentImageNumber - 1],
					title: title,
					description: description
				};
				album.images[currentImageNumber - 1] = updatedImage;
				setIsEditMode(false);
			}
		);
	};

	return <div className="row">
		<div className={`${classes.AlbumWrapper} col-xl-12 col-lg-10 col-md-10 col-10`}>
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
									<FontAwesomeIcon icon={faTrashCan}/>
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
					{album.imagesCount ?
						<img className="img-fluid"
						     src={album.images[currentImageNumber - 1].url}
						     alt={album.images[currentImageNumber - 1].description}/>
						:
						<img src={noImage} alt="no preview"/>
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
